import  imgUser from "../assets/static/user.png";

export default function User({user, selectUser}){
    return (
    <div className="user_wrapper" onClick={()=>selectUser(user)}>
        <div className="user_info">
            <div className="user_detail">
                <img  src={ imgUser} alt="avatar" className="avatar"/>
                <h4>{user.displayName || user.email} </h4>
            </div>
            <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
        </div>
    </div>
    )
}