"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ExpandIcon } from "lucide-react";

export default function Fakman() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: "/projects/fakman/FakmanWebGL.loader.js",
    dataUrl:
      "https://utfs.io/f/NQ2gjwtsCGtKMZLhyD8kWU3EkF6oeJ5t97qRmM4xOK2ZLX0B",
    frameworkUrl: "/projects/fakman/FakmanWebGL.framework.js",
    codeUrl:
      "https://utfs.io/f/NQ2gjwtsCGtKg5qksj0EkM2bcfI49WrusQFoUhxBjlNHXZP5",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  return (
    <Fragment>
      {isClient ? (
        <div>
          <h1 className="text-3xl font-bold text-blue-900 sm:hidden dark:text-slate-200">
            NOTE: This game may not work properly or at all on mobile devices,
            as it is not officially supported by Unity WebGL.
          </h1>
          <Unity
            unityProvider={unityProvider}
            style={{ width: 800, height: 600 }}
          />

          <div className="flex flex-row space-x-5">
            <Alert className="w-100">
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                There is a known bug where the game does not render properly if
                not in fullscreen<br></br>
                Please press the button provided to enter fullscreen.
              </AlertDescription>
            </Alert>
            <Button onClick={handleClickEnterFullscreen} className="h-12 w-12">
              <ExpandIcon />
            </Button>
          </div>
        </div>
      ) : (
        "This is the server side content: If you see this something went very wrong."
      )}
    </Fragment>
  );
}
