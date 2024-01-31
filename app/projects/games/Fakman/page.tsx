"use client"
import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
        <h1 className="sm:hidden text-3xl font-bold text-blue-900 dark:text-slate-200">
            NOTE: This game may not work properly or at all on mobile devices, as it is not officially supported by Unity WebGL.
        </h1>
        <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }}/>
        
        <div className="flex flex-row space-x-5">
            <Alert className="w-100">
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                    There is a known bug where the game does not render properly if not in fullscreen<br></br>
                    Please press the button provided to enter fullscreen.
                </AlertDescription>

            </Alert>
            <Button
                onClick={handleClickEnterFullscreen}
                className="w-12 h-12"
            >
                <FontAwesomeIcon icon={faExpand} size="2x"/>
            </Button>
        </div>
        
    </Fragment>
}