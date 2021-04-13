import React from 'react'
import PropTypes from 'prop-types'

const BandAdd = () => {
    return (
        <>
            <h3>Agregar banda</h3>

            <form >
                <input type="text" className="form-control" placeholder="Nuevo nombre de banda"/>
            </form>
        </>
    )
}

BandAdd.propTypes = {

}

export default BandAdd
