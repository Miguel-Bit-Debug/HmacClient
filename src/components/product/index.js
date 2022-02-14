import React, { useState } from "react"
import axios from 'axios'
import CryptoJS from "crypto-js"

function Product() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const secretKey = "9433172a-1198-4a9e-a807-11f7729d9a73"

    const product = {
        name: name,
        price: price
    }

    function generateHmac(param) {

        console.log(`${process.env}`);
        let sharedKey = "9433172a-1198-4a9e-a807-11f7729d9a73"

        let requestContentBase64 = ""
        let requestContentBodyHash = ""
        let requestBody = JSON.stringify(param)

        if (requestBody != "") {
            let bodyBytes = CryptoJS.enc.Utf8.parse(requestBody)
            requestContentBodyHash = CryptoJS.SHA256(bodyBytes)
            requestContentBase64 = CryptoJS.enc.Base64.stringify(requestContentBodyHash)
        }

        let payloadBytes = CryptoJS.enc.Utf8.parse(requestContentBase64)
        let secretKeyBytes = CryptoJS.enc.Utf8.parse(sharedKey)
        let signatureBytes = CryptoJS.HmacSHA256(payloadBytes, secretKeyBytes)
        let requestSignatureBase64String = CryptoJS.enc.Base64.stringify(signatureBytes)

        return requestSignatureBase64String
    }

    function addProduct() {
        axios.post('http://localhost:5000/v1/Product', product, {
            'headers': {
                'X-Hmac-Key': generateHmac(product)
            }
        }).then((res) => {
            console.log(`Secret Key: ${secretKey}`)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form>
                <div className="main">
                    <h3 className="text-center">Adicionar Produto</h3>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-4 col-bg-4 col-sm-4">
                                <input onChange={((e) => setName(e.target.value))} type="text" className="form-control" placeholder="Nome do Produto" />
                            </div>
                            <div className="col-md-4 col-bg-4 col-sm-4">
                                <input onChange={((e) => setPrice(e.target.value))} type="number" className="form-control" placeholder="Preço" />
                            </div>
                        </div>
                        <div className="col-md-7 col-bg-5 col-sm-5 mx-auto">
                            <a to="/" onClick={() => addProduct()} className="d-flex btn btn-primary text-center mt-3 form-control justify-context-center">Adicionar</a>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Product