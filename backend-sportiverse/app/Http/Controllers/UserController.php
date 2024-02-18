<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            // Agrega más reglas de validación según sea necesario
        ]);

        // Crea un nuevo usuario
        User::create($request->all());

        // Redirige al usuario a la página de listado de usuarios
        return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente.');
    }

    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        // Valida los datos del formulario
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|regex:/^\+(?:[0-9] ?){6,14}[0-9]$/',
            'address' => 'required|string|max:255',
        ], [
            'full_name.required' => 'El campo nombre completo es obligatorio.',
            'full_name.max' => 'El campo nombre completo no puede ser mayor que :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El campo correo electrónico debe ser una dirección de correo válida.',
            'email.unique' => 'El correo electrónico ya está siendo utilizado por otro usuario.',
            'phone.max' => 'El campo teléfono no puede ser mayor que :max caracteres.',
            'address.required' => 'El campo dirección es obligatorio.',
            'address.max' => 'El campo dirección no puede ser mayor que :max caracteres.',
        ]);

        // Actualiza el usuario
        $user->update($request->all());

        // Redirige al usuario a la página de detalles del usuario
        return redirect()->route('users.show', $user)->with('success', 'Usuario actualizado exitosamente.');
    }

    public function destroy(User $user)
    {
        // Elimina el usuario
        $user->delete();

        // Redirige al usuario a la página de listado de usuarios
        return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente.');
    }
}
