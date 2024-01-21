"use client"
import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "@/components/ui/button"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faExpand
} from "@fortawesome/free-solid-svg-icons";

export default function Fakman() {
    const { unityProvider, requestFullscreen } = useUnityContext({
        loaderUrl:"../../build/FakmanWebGL.loader.js",
        dataUrl:"../../build/FakmanWebGL.data",
        frameworkUrl:"../../build/FakmanWebGL.framework.js",
        codeUrl:"../../build/FakmanWebGL.wasm",
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
        });
    
    function handleClickEnterFullscreen() {
        requestFullscreen(true);
    }

    return <Fragment>
        <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }}/>
        <div className="flex flex-row space-x-5">
            <h1>
                <strong>NOTE: There is a known bug where the game does not render properly if not in fullscreen</strong>
                <br></br>Please press the button to enter fullscreen
            </h1>
            <Button
                onClick={handleClickEnterFullscreen}
                className="w-12 h-12"
            >
                <FontAwesomeIcon icon={faExpand} size="2x"/>
            </Button>
        </div>
        
    </Fragment>
}