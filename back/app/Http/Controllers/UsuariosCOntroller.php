<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuariosCOntroller extends Controller
{
    public function store(Request $request) {
        $data = $request->validate([
            "nome" => 'required|string|max:100',
            "email" => 'required|email'
        ]);

        $usuarios = Usuarios::create($data);

        return response()->json([
            'message' => 'Dados inseridos com sucesso',
            'data' => $usuarios
        ], 201);
    }

    public function index() {
        $usuarios = Usuarios::all();

        return response()->json([
            "message" => "Dados dos usúarios buscados com sucesso",
            "data" => $usuarios
        ], 200);
    }

    public function update(Request $request, int $id) {
        $dadosRecebidos = $request->validate([
            "nome" => 'required|string|max:25',
            "email" => 'required|email|unique:usuarios,email'
        ]);

        $usuario = Usuarios::findOrFail($id);

        $usuario->update($dadosRecebidos);

        return response()->json([
            "message" => "Dados atualizado com sucesso",
            "data" => $usuario
        ], 200);
    }
}
