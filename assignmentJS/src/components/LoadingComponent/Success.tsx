import Lottie from "lottie-react"
import SuccessAnimation from "../../assets/anim/doneItem.json"

type SuccessProps = {
    className: string
}

const Success = (props: SuccessProps) => {
    return (
        <Lottie className={`${props.className}`} animationData={SuccessAnimation} loop={false} />
    )
}

export default Success