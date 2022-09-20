
import Header from "../components/header"
import Footer from "../components/footer"
import { useAuth } from "../context/authContext"

export default function Home(){

    const {user} = useAuth()

    if(user) {
        console.log(user)
    }

    return(
        <div>
            <Header></Header>
            <div class=" text-center my-5">
                hola
            </div>
            <Footer></Footer>
        </div>
    )
}

