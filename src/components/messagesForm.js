import React from "react";

export default function MessageForm({handleSubmit,text,setText}){



    return (
        <form className="message_form" onSubmit={handleSubmit}>
            <input type={"file"} id ="img" accept="image/" style={{display:"none"}} />
            <div>
                <input type={"text"} placeholder="Escribi su mensaje" value={text} onChange={e =>setText(e.target.value)} />
            </div>
            <div>
                <button  className="btn">Enviar</button>
            </div>
        </form>
    )
}