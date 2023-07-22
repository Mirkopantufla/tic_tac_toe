import React, { useEffect, useRef, useState } from 'react'
import Numbers from './Numbers.jsx';

const board = () => {

    const refSmall = useRef("");

    const refSmall2 = useRef("");

    const regex = /^[a-zA-Z]/gm;

    const [pasos, setPasos] = useState(0);

    const [player1, setPlayer1] = useState([]);

    const [player2, setPlayer2] = useState([]);

    const [nombreP1, setNombreP1] = useState("");

    const [nombreP2, setNombreP2] = useState("");

    const [marca, setMarca] = useState(false);

    const [winner, setWinner] = useState(false);

    const [winnerName, setWinnerName] = useState('');

    const winnerCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    useEffect(() => {

        checkWinner(player1)
        checkWinner(player2)

    }, [player1, player2])


    // const pasoUnoEz = (player) => {
    //     if (player != "" && !regex.test(player)) {
    //         setPasos(1)
    //     } else {
    //         refSmall.current.classList.remove('d-none');
    //         return;
    //     }
    // }

    const elegirMarca = (e) => {
        let valor = e.target.id;
        setMarca(false)
        setNombreP1()

        if (nombreP1 && nombreP1.length > 0 && nombreP2.length > 0) {

            if (valor == 'btnX') {
                setMarca(false);
                setPlayer1([...player1, false, nombreP1]);
                setPlayer2([...player2, true, nombreP2]);
            } else if (valor == 'btnO') {
                setMarca(true);
                setPlayer1([...player1, true, nombreP1]);
                setPlayer2([...player2, false, nombreP2]);
            }

            document.getElementById('first').classList.add('d-none')
            document.getElementById('second').classList.remove('d-none')
        }

    }

    const handleClickGato = (e) => {
        let valor = e.target.id;
        valor = parseInt(valor)
        setPasos(pasos + 1)

        if (marca == true) {

            player1[0] == true ? setPlayer1([...player1, valor]) : null;
            player2[0] == true ? setPlayer2([...player2, valor]) : null;
            e.target.innerHTML = 'O'
            setMarca(false)
            valor = 0;
        }

        if (marca == false) {

            player1[0] == false ? setPlayer1([...player1, valor]) : null;
            player2[0] == false ? setPlayer2([...player2, valor]) : null;
            e.target.innerHTML = 'X'
            setMarca(true)
            valor = 0;
        }

        e.target.classList.add("pe-none")
    }

    const checkWinner = (player) => {
        let onlyNumbers = player.slice(2)
        winnerCombinations.forEach(winner => {
            let points = 0;
            onlyNumbers.forEach(num => {
                if (winner.includes(num)) {
                    points++;
                }
            });
            if (points == 3) {
                setWinner(true);
                setWinnerName(player[1])
                document.getElementById('second').classList.add('d-none')
                document.getElementById('third').classList.remove('d-none')
            }
        });

        if (pasos == 9 && winner == false) {
            document.getElementById('second').classList.add('d-none')
            document.getElementById('third').classList.remove('d-none')
        }
    }

    const reiniciarJuego = () => {
        location.reload();
        // document.getElementById('third').classList.add('d-none')
        // for (let i = 1; i < 9; i++) {
        //     document.getElementById(i).innerHTML = ""
        // }
        // setPlayer1([])
        // setPlayer2([])
        // setNombreP1("")
        // setNombreP2("")
        // setPasos(0)
        // setMarca(false)
        // setWinner(false)
        // setWinnerName("")
        // document.getElementById('first').classList.remove('d-none')
    }


    return (
        <>
            <div className="row">
                <div className="col-12 text-center mt-5 bg-light rounded-5 p-5">
                    <h1>Tic Tac Toe!!</h1>
                    <h4>Bienvenido al juego del gato</h4>
                </div>
            </div>
            <div id='first' className='row text-light'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5 d-flex flex-column align-items-center mt-3'>
                        <h2 className='me-2'>Player 1</h2>
                        <input className='form-control w-75' type="text" id='inptNombre' onChange={(e) => setNombreP1(e.target.value)} />
                        <small ref={refSmall} className='d-flex align-items-center ms-2 text-danger d-none'>El nombre debe contener solo letras</small>
                    </div>

                    <div className='col-5 d-flex flex-column align-items-center mt-3'>
                        <h2 className='me-2'>Player 2</h2>
                        <input className='form-control w-75' type="text" id='inptNombre' onChange={(e) => setNombreP2(e.target.value)} />
                        <small ref={refSmall2} className='d-flex align-items-center ms-2 text-danger d-none'>El nombre debe contener solo letras</small>
                    </div>
                </div>
                <h2 className='text-center mt-5'>El simbolo marcado sera el primer Player</h2>
                <div className="col-12 d-flex justify-content-center mt-3 bg-light rounded-5 p-5">
                    <button id='btnX' className='btn btn-dark fs-1 me-4 w-25' onClick={elegirMarca}>X</button>
                    <button id='btnO' className='btn btn-dark fs-1 w-25' onClick={elegirMarca}>O</button>
                </div>

            </div>
            <div id='second' className="row d-none mb-5">
                <h1 className='text-light mt-5'>
                    Le toca jugar a {marca ? 'O' : 'X'}
                </h1>
                <div className="col-12 mt-5 bg-secondary rounded-5">
                    <div className="row d-flex justify-content-center mt-5">
                        <Numbers id={1} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={2} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={3} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                    </div>
                    <div className="row d-flex justify-content-center">
                        <Numbers id={4} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={5} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={6} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                    </div>
                    <div className="row d-flex justify-content-center mb-5">
                        <Numbers id={7} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={8} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                        <Numbers id={9} addClass={'bg-light rounded-4'} funcion={handleClickGato} />
                    </div>
                </div>
            </div>
            <div id='third' className="row d-none">
                <div className="col-12 mt-5 text-center bg-secondary rounded-5 p-5">
                    <h1 className='text-light'>{winnerName ? 'El ganador es: ' + winnerName : 'Empate'}</h1>
                </div>
                <div className='offset-4 col-4 mt-4 text-center p-3'>
                    <button onClick={reiniciarJuego} className='btn btn-light fs-4'>
                        Reiniciar
                    </button>
                </div>
            </div>
        </>
    )
}

export default board