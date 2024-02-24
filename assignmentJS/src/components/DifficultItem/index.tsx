export type ItemProps = {
    className?: string,
    name: string,
    onCLick: () => void
}

const Item = ({ name, className, onCLick }: ItemProps) => {
    return (
        <li onClick={onCLick} className={`${className} px-2 py-1  font-semibold w-full `}>{name}</li>
    )
}

export default Item;