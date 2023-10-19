import '../styles/footer.css'

const Footer = () => {
  return (
    <footer id='footer'>
      <p id='by'>
        by
        <a 
          href='https://github.com/levymonteiro' 
          id='github' 
          target='_blank' 
          rel='noreferrer'
        >
          Levy Monteiro
        </a>
      </p>
    </footer>
  )
}

export { Footer }