
import { useState } from "react"
import Card from "../componentes/Card"
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio"

import './Sorteio.css'
import { useListaParticipantes } from "../state/hook/useListaParticipantes"

const Sorteio = () => {

    const participantes = useListaParticipantes();

    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoScreto, setAmigoSecreto] = useState('')

    const resultado = useResultadoSorteio()

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
            setTimeout(() => setAmigoSecreto(''), 5000);
        }
    }

    return (<Card>
        <section className="sorteio">
            <h2>Quem vai tirar o papelzinho?</h2>
            <form onSubmit={sortear}>
                <select
                    required
                    name="participanteDavez"
                    id="participanteDavez"
                    placeholder="Selecione o seu nome"
                    value={participanteDaVez}
                    onChange={evento => setParticipanteDaVez(evento.target.value)}
                >
                    <option>Selecione o seu nome</option>
                    {participantes.map(participante => <option key={participante}>{participante}</option>)}
                </select>
                <p>Clique em sortear para ver quem é seu amigo secreto!</p>
                <button className="botao-sortear">Sortear</button>
            </form>
            {amigoScreto && <p className="resultado" role="alert">{amigoScreto}</p>}
            <footer className="sorteio">
                <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
            </footer>
        </section>
    </Card>)
}

export default Sorteio