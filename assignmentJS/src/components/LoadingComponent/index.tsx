import Lottie from "lottie-react"
import LoadingAnimation from "../../assets/anim/loading.json"

type LoadingProps = {
    className: string
}

const Loading = (props: LoadingProps) => {
    return (
        <Lottie className={`${props.className}`} animationData={LoadingAnimation} loop={true} />
    )
}

export default Loading