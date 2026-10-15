import { useState } from "react"
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { CircleX } from "lucide-react";

function App() {

    // C => CREATE
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [responseApi, setResponse] = useState(null);

    async function inserirRegistro(e) {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/inserir-registros",
          {
            nome: name,
            email: email
          }
        );

        setResponse(data.data);

        setName("");
        setEmail("");
      } catch (error) {
        console.error(error);
      }
    }


    // R => READ
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    async function lerRegistros() {
      try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/buscar-registros");
        setDados(data.data);
        console.log(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error)
      } 
    }

    // U => UPDATE
    const [nameUpdate, setNameUpdate] = useState("");
    const [emailUpdate, setEmailUpdate] = useState("");
    const [response, setRes] = useState(null);

    async function atualizarRegistro(e) {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `http://127.0.0.1:8000/api/atualizar-registro/3`,
          {
            nome: nameUpdate,
            email: emailUpdate
          }
        );

        setRes(data.data);

        setNameUpdate("");
        setEmailUpdate("");
      } catch (error) {
        console.error(error);
      }
    }


    // D => DELETE
    const [dadosDelete, setdadosDelete] = useState([]);
    const [destroy, setDestroy] = useState(true);


    async function deletarRegistro() {
      try {
        const { data } = await axios.delete("http://127.0.0.1:8000/api/deletar-registro/3");
        setdadosDelete(data.data);
        console.log(data);
        setDestroy(false);
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <>
      <main className="w-dvw h-dvh bg-zinc-700 grid grid-rows-2 grid-cols-2 gap-3 p-2">

          {/* C => CREATE */}
            <div className="flex flex-col rounded-lg items-center  col-start-1 row-start-1 bg-red-600 shadow-xl p-3 gap-3">

              {/* Cabecalho */}
              <div className="flex flex-col justify-center items-center px-5 rounded-full text-center h-1/4 font-bold bg-amber-50 shadow-xl">
                <h2 className="text-3xl text-red-700 animate-pulse">Axios - Create</h2>
                <p className="text-zinc-900">Enviando uma requisição via Método POST</p>
              </div>

              {/* Formulario */}
              <div className="flex flex-col justify-center items-center bg-zinc-200 h-full w-full shadow-2xl rounded-lg">
                  <form onSubmit={inserirRegistro} className="flex flex-col items-center gap-3 w-full h-full text-center bg-zinc-200 p-4 rounded-xl">
                      <div className="flex flex-col">
                        <label className="text-2xl font-bold text-red-700" htmlFor="name">Nome</label>
                        <input id="name" className="bg-red-600 p-3 rounded-full text-white font-bold" type="text" placeholder="Digite o nome" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-2xl font-bold text-red-700" htmlFor="email">Email</label>
                        <input id="email" className="bg-red-600 p-3 rounded-full text-white font-bold" type="email" placeholder="Digite o email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>


                      {/* Botao de envio de requisição via post com AXIOS */}
                      <button className="bg-red-700 p-2 text-white font-bold rounded-full" type="submit">Enviar requisição via AXIOS</button>
                  </form>

              {/* footer */}
                {
                  responseApi && (
                    <div className="flex flex-col text-center mb-4">
                      <p className="font-bold text-red-700 text-2xl">Dados enviados com sucesso!</p>
                      <p className="font-bold">Nome do usuário: {responseApi.nome}</p>
                      <p className="font-bold" >E-mail do usuário: {responseApi.email}</p>
                    </div>
                  )
                }
              </div>
            </div>



          {/* R => READ */}
            <div className="col-start-2 row-start-1 flex flex-col rounded-lg items-center  bg-blue-600 shadow-xl p-3 gap-3">

                {/* Cabecalho */}
                <div className="flex flex-col justify-center items-center px-5 rounded-full text-center h-1/4 font-bold bg-amber-50 shadow-xl">
                  <h2 className="text-3xl text-blue-700 animate-pulse">Axios - READ</h2>
                  <p className="text-zinc-900">Recebendo os dados via método GET</p>
                </div>

              {/* Conteudo */}
              <div className="flex flex-col  items-center bg-zinc-200 h-full w-full shadow-2xl rounded-lg">
                <div className="flex flex-col gap-3 justify-center items-center p-5">
                  <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Clique no botão abaixo para buscar as requisições via AXIOS</h2>
                  <button onClick={lerRegistros} className="bg-blue-700 p-4 rounded-full shadow-xl text-white font-bold hover:scale-105 hover:bg-blue-500 transition-all">Buscar dados...</button>
                </div>

                {
                  loading ? <LoaderCircle className="mt-5 animate-spin" color="#1c71d8" size={100} /> : <div className="flex flex-col items-center justify-center bg-blue-600 rounded-xl ">
                    <ul className="p-2 text-white font-bold">
                        {
                          dados.map((user) => (
                              <li key={user.id}>ID do usuario: {user.id} Nome do Usuário: {user.nome} | Email do usuário: {user.email}</li>
                          ))
                        }
                    </ul>
                  </div>
                } 
              </div>

            </div>





          {/* U => UPDATE */}
            <div className="flex flex-col col-span-1 row-start-2 rounded-lg items-center bg-yellow-600 shadow-xl p-3 gap-3">
                {/* Cabecalho */}
                <div className="flex flex-col justify-center items-center px-5 rounded-full text-center h-1/4 font-bold bg-amber-50 shadow-xl">
                  <h2 className="text-3xl text-yellow-700 animate-pulse">Axios - UPDATE</h2>
                  <p className="text-zinc-900">Atualizando dados existente via axios por metodo post</p>
                </div>


                {/* Conteúdo */}
                <div className="flex flex-col  items-center bg-zinc-200 h-full w-full shadow-2xl rounded-lg">
                    <form onSubmit={atualizarRegistro} className="flex flex-col items-center gap-3 w-full h-full text-center bg-zinc-200 p-4 rounded-xl">
                      <div className="flex flex-col">
                        <label className="text-2xl font-bold text-amber-900" htmlFor="nameUpdate">Atualizar nome</label>
                        <input id="nameUpdate" className="bg-zinc-600 p-3 rounded-full text-white font-bold" type="text" placeholder="Digite o nome" 
                          value={nameUpdate}
                          onChange={(e) => setNameUpdate(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-2xl font-bold text-amber-900" htmlFor="emailUpdate">Atualizar email</label>
                        <input id="emailUpdate" className="bg-zinc-600 p-3 rounded-full text-white font-bold" type="email" placeholder="Digite o email" 
                          value={emailUpdate}
                          onChange={(e) => setEmailUpdate(e.target.value)}
                        />
                      </div>


                      {/* Botao de envio de requisição via post com AXIOS */}
                      <button className="bg-amber-700 p-2 cursor-pointer text-white font-bold rounded-full" type="submit">Enviar requisição via AXIOS</button>
                  </form>

              {/* footer */}
                {
                  response && (
                    <div className="flex flex-col text-center mb-4">
                      <p className="font-bold text-red-700 text-2xl">Dados atualizado com sucesso!</p>
                      <p className="font-bold">Nome do usuário: {response.nome}</p>
                      <p className="font-bold" >E-mail do usuário: {response.email}</p>
                    </div>
                  )
                }
                </div>
            </div>





          {/* D => DELETE */}
            <div className="flex flex-col col-start-2 row-start-2 rounded-lg items-center bg-green-600 shadow-xl p-3 gap-3">
                {/* Cabecalho */}
                <div className="flex flex-col justify-center items-center px-5 rounded-full text-center h-1/4 font-bold bg-amber-50 shadow-xl">
                  <h2 className="text-3xl text-green-700 animate-pulse">Axios - DELETE</h2>
                  <p className="text-zinc-900">Excluido dados existente via axios por metodo delete</p>
                </div>

                  {/* Conteúdo */}
                <div className="flex flex-col  items-center bg-zinc-200 h-full w-full shadow-2xl rounded-lg">
                  <div className="flex flex-col gap-3 justify-center items-center p-5">
                    <h2 className="text-2xl font-bold text-green-700 animate-pulse">Clique no botão abaixo para excluir uma requisições via AXIOS</h2>
                    <button onClick={deletarRegistro} className="bg-green-700 p-4 rounded-full shadow-xl text-white font-bold hover:scale-105 hover:bg-green-500 transition-all">Excluir dados...</button>
                  </div>
                  
                  {
                  destroy ? <CircleX className="mt-6 animate-ping" color="green" size={100} /> : <div className="flex flex-col items-center justify-center bg-blue-600 rounded-xl ">
                    <ul className="p-2 text-white font-bold">
                        {
                          dadosDelete.map((d) => (
                              <li key={d.id}>ID do usuario: {d.id} Nome do Usuário: {d.nome} | Email do usuário: {d.email}</li>
                          ))
                        }
                    </ul>
                  </div>
                } 

                </div>
            </div>
      </main>
    </>

  )
}

export default App
