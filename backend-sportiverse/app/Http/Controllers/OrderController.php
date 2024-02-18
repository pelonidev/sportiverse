<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Obtiene todas las órdenes del usuario actualmente autenticado
        $orders = Order::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get();

        return view('orders.index', compact('orders'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        // Verificar que la orden pertenece al usuario actual
        if (Auth::id() !== $order->user_id) {
            abort(403, 'No tienes permiso para ver esta orden.');
        }

        return view('orders.show', compact('order'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar los datos del pedido
        $request->validate([
            'user_id' => 'required|exists:users,id', // Suponiendo que el ID del usuario viene del formulario
            'status' => 'required|string|in:pending,processing,confirmed,shipped,delivered,cancelled',
            'total' => 'required|numeric|min:0',
            'shipping_address' => 'required|string|max:255',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Crear el pedido y sus detalles dentro de una transacción
        DB::beginTransaction();
        try {
            // Crear el pedido
            $order = Order::create([
                'order_code' => $this->generateOrderCode(), // Generar un código de pedido único
                'user_id' => $request->input('user_id'),
                'status' => $request->input('status'),
                'total' => $request->input('total'),
                'shipping_address' => $request->input('shipping_address'),
            ]);

            // Crear los detalles del pedido
            foreach ($request->input('products') as $productData) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $productData['product_id'],
                    'quantity' => $productData['quantity'],
                    'price' => 0, // Calcular el precio del producto si es necesario
                    'subtotal' => 0, // Calcular el subtotal si es necesario
                    'discount' => 0, // Calcular el descuento si es necesario
                    'total' => 0, // Calcular el total si es necesario
                ]);
            }

            // Actualizar el stock de los productos si es necesario

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            // Manejar el error, registrar el error, etc.
            return redirect()->back()->with('error', 'Error al crear el pedido');
        }

        return redirect()->route('orders.index')->with('success', 'Pedido creado correctamente');
    }

    // Generar un código de pedido único (puedes ajustar este método según tus necesidades)
    private function generateOrderCode()
    {
        return 'ORD-' . date('YmdHis') . '-' . mt_rand(1000, 9999);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        // Valida los datos del formulario...

        // Actualiza el estado de la orden
        $order->status = $request->status;
        $order->save();

        // Redirige al usuario a la página de detalles de la orden
        return redirect()->route('orders.show', $order)->with('success', '¡Estado de la orden actualizado exitosamente!');
    }
}
