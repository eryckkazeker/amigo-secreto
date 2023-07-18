import React from "react";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import { useNavigate } from "react-router-dom";

import './Rodape.css';
import { useSorteador } from "../state/hook/useSorteador";

const Rodape = () => {

    const participantes = useListaParticipantes();

    const navegarPara = useNavigate();

    const iniciar = () => {
        sortear();
        navegarPara('/sorteio');
    }

    const sortear = useSorteador();

    return(
        <footer className="rodape-configuracoes">
            <button
            className="botao"
            disabled={participantes.length < 3}
            onClick={iniciar}
            >
                Iniciar brincadeira
            </button>
            <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
        </footer>
    );
}

export default Rodape;