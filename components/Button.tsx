import styles from "../styles/Button.module.css"



type buttonProps = {
    text: string,
    length?: string
    id?: string,
    disabled?:boolean
    handleClick:()=>void
}

function Button({text,length,id,disabled,handleClick}:buttonProps) {
    return (
        <button id={id} disabled={disabled} className={`${styles.button} ${styles[`${length}`]}`} type="button" onClick={handleClick}>{text}</button>
  )
}

export default Button