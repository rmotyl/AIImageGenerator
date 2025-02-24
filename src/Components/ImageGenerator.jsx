
import './ImageGenerator.css'
import default_img from '../assets/default_img.png'
import { useState, useRef, useEffect } from 'react'

function ImageGenerator() {

    const [imageUrl, setImage] = useState(default_img)
    const inputPrompt = useRef()

    const [loadingBoxActive, setLoadingBoxActive] = useState("")
    const [loading, setLoading] = useState(false)

    const handleGeneration = async () => {

        setLoading(true)
        setLoadingBoxActive("loading-box-active")

        const url = "https://api.edenai.run/v2/image/generation"

        const startTime = Date.now()

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer YOUR_API_KEY",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    providers: "openai",
                    text: inputPrompt.current.value,
                    resolution: "1024x1024"
                })
            })
    
            const data = await response.json()
            setImage(data.openai.items[0].image_resource_url)
            console.log(data.openai.items[0].image_resource_url)
            
            const elapsedTime = Date.now() - startTime
            const minLoadingTime = 500
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
            setTimeout(()=>{setLoading(false), setLoadingBoxActive("")
            }, remainingTime)
        } catch(e) {
            setImage("Bład w generowaniu obrazu")
            console.log(e)
        }

    }

    return (
        <>
            <h1>AI image generator</h1>
            <div className="image-box">
                <img src={imageUrl} alt={imageUrl} />
                <div className={`loading-box ${loadingBoxActive}`}>
                    {loading && <div className="loading-circle"></div>}
                </div>
            </div>
            <div className="prompt-box">
                <input
                    type="text"
                    placeholder='Write text to image generate...'
                    ref={inputPrompt}
                />
                <button onClick={() => handleGeneration()} >Generate</button>

                {/* onClick={()=>handleGeneration()}  */}
            </div>
        </>
    )
}

export default ImageGenerator