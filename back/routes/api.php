<?php

use App\Http\Controllers\UsuariosCOntroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Inserir post via axios
Route::post('/inserir-registros', [UsuariosCOntroller::class, 'store']);
// http://127.0.0.1:8000/api/inserir-registros

Route::get('/buscar-registros', [UsuariosCOntroller::class, 'index']);
// http://127.0.0.1:8000/api/buscar-registros

Route::put('/atualizar-registro/{id}', [UsuariosCOntroller::class, 'update']);
// http://127.0.0.1:8000/api/atualizar-registro/

Route::delete('/deletar-registro/{id}', [UsuariosCOntroller::class, 'destroy']);
// http://127.0.0.1:8000/api/deletar-registro/