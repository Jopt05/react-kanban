
import { useContext } from 'react'
import loader from '../../assets/loader.gif'
import { LoaderContext } from '../../context/loader.context'

const LoaderComponent = () => {

    const { loaderState } = useContext( LoaderContext )

  return (
    <div
        className={`w-full bg-black/50 h-screen items-center justify-center fixed top-0 left-0 z-50 ${loaderState.isShown ? 'flex' : 'hidden'}`}
    >
        <img
            src={loader}
            className='w-20 h-20 z-60'
        />
    </div>
  )
}

export default LoaderComponent