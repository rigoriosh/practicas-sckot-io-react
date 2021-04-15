import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiContext } from '../context/UiContext'

const useHideMenu = (ocultar) => {

    const {showMenu, hideMenu} = useContext(UiContext);

    useEffect(() => {
        ocultar ? hideMenu() : showMenu();
        return () => {}
    }, [hideMenu, ocultar, showMenu])

    // no retorna nada, solo cambia el valor del state
}

useHideMenu.propTypes = {
    ocultar: PropTypes.bool.isRequired
}

export default useHideMenu
