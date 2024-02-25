import Lottie from "lottie-react"
import DeleteAnimation from "../../assets/anim/delete.json"

type DeleteProps = {
    className: string
}

const Delete = (props: DeleteProps) => {
    return (
        <Lottie className={`${props.className}`} animationData={DeleteAnimation} loop={false} />
    )
}

export default Delete