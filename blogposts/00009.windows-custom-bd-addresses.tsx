import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";

export const metadata: Metadata = {
  title: "Arbitary Bluetooth Address names with the TPLink UB500 using Bumble.",
  date: "2026-01-08",
  description: "A.k.a the start of how to MITM bluetooth on Windows.",
  lastUpdate: "2026-01-08",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <div>
          <h2>Intro</h2>
          This blogpost is a byproduct of my attempts to port NXBT (or at least
          eh functionality) to Windows.
          <br />
          One consistent issue I had was the ability to change the bluetooth
          address of the adapter itself, as newer bluetooth chipsets load it
          from firmware and is not usually changable from userspace.
          <br />
          Very fortunately, when I was at the end of the road with my
          experimentation, on a random google, I found Xeno Kovah&apos;s
          presentation on new research into the Realtek RTL8761B which he
          presented in Hardwear 2025
          <a href="https://darkmentor.com/publication/2025-11-hardweario/">
            <sup>(1)</sup>
          </a>
          <a href="https://darkmentor.com/2025-11-21_HardwearioNL2025_RTL8761B_RE_Slides_With_Builds.pdf">
            <sup>(2)</sup>
          </a>
          .
        </div>
        <div>
          <h2>Pre-requisites</h2>
          This guide requires a RTL8761B family (RTL8761B, RTL8761BU) bluetooth
          chipset.
          <br /> I personally have tested with a TPLink UB500 v2 usb bluetooth
          dongle.
          <h2>Setup:</h2>
          <h3>1. WinUSB Driver</h3>
          <div>
            Before we load the patched firmware, we have to make Windows use the
            WinUsb driver so that we can supply our own firmware.
            <ol>
              <li>
                Firstly you will need to download{" "}
                <a href="https://zadig.akeo.ie/">zadig</a>
              </li>
              <li>
                Then open zadig and choose the UB500 by selecting TP-Link
                Bluetooth USB Adapter from the dropdown.
                <br /> (If it doesn&apos;t show up, you may need to tick
                Options&gt;List All Devices)
              </li>
              <li>
                Then make sure the WinUSB driver is selected and install the
                driver
              </li>
            </ol>
          </div>
          <h3>2. Getting the firmware</h3>
          <div>
            Great, we have the correct driver, now we need the firmware.
            <ol>
              <li>
                You can either use the first party tool
                <code> bumble-rtk-fw-download</code> to download the required
                firmware{" "}
                <a href="https://google.github.io/bumble/drivers/realtek.html">
                  (Docs)
                </a>
              </li>
              <li>
                Or you can directly download the firmware from the linux kernel
                git directly{" "}
                <a
                  href="
          https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/rtl_bt"
                >
                  here.
                </a>
              </li>
            </ol>
          </div>
          <h3>2.x Pointing bumble to the firmware</h3>
          <div>
            If you choose to download the firmware directly, you need to now let
            Bumble find the firmware by either
            <ol>
              <li>
                Setting the environment variable{" "}
                <code>BUMBLE_RTK_FIRMWARE_DIR</code> to the firmware&apos;s
                parent dir
                <br />I found the easiest way for me was to just set it in the
                imports.
                <CodeBlock className="w-fit pr-10" language="python">
                  {`import os

  os.environ["BUMBLE_RTK_FIRMWARE_DIR"] = (
    r"C:\\EXAMPLE\\DIRECTORY"
  )`}
                </CodeBlock>
              </li>
              <li>Or you can place it in same directory as your code.</li>
            </ol>
          </div>
          <h3>3. Configuring Firmware to your custom BD Address</h3>
          <div>
            Now, we are ready to configure the firmware so that we can use any
            arbitary Bluetooth Address.
            <br />
            <ol>
              <li>
                First we download an existing modded firmware config from the
                research github repo&apos;s custom firmware{" "}
                <a href="https://github.com/darkmentorllc/DarkFirmware_real_i/tree/master/03_custom_patch_standalone_file_for_linux">
                  folder.
                </a>{" "}
                <br />
                (Remember to take a look at the rest of the repo, it has some
                really interesting stuff.)
              </li>
              <li>
                After you have downloaded a config, unzip the archive and copy
                the config <code>.bin</code> file into the same directory as
                your firmware.
                <br />
                <div className="flex space-x-2">
                  <div className="font-bold">Note: </div>
                  <div>
                    If you downloaded the firmware using{" "}
                    <code> bumble-rtk-fw-download</code>, your directory would
                    be{" "}
                    <code>%AppData%\Local\Google\bumble\firmware\realtek</code>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <h3>4. Customising your BD Address</h3>
          <div>
            If you run your bumble code now, (Use any example if you don&apos;t
            have any code yet), if it is working, it should now have an address
            of either 11:22:33:44:55:66 or 00:11:22:33:44:55. <br />
            (Note: If it isn&apos;t working, you can try refresh it, by
            unpluging and repluging the bluetooth dongle, as it tends to
            &apos;hold&apos; onto any firmware you give it).
            <br />
            Now to customise the address, you need to change the config with a
            hex editor of your choice.
            <ol>
              <li>
                Firstly, you need a hex editor of your choice, (Personally I use
                HXD, but that isn&apos;t a particularly modern option)
              </li>
              <li>
                Open the config file in the hex editor, it should be extremely
                simple, either
                <br />
                <code>55 AB 23 87 09 00 30 00 06 55 44 33 22 11 00</code>
                <br />
                or
                <br />
                <code>55 AB 23 87 09 00 30 00 06 66 55 44 33 22 11</code>
                <br />
                To change the BD address, modify the last 6 bytes.{" "}
                <code className="flex space-x-2">
                  <div>55 AB 23 87 09 00 30 00 06 </div>
                  <div className="text-amber-600">XX XX XX XX XX XX</div>
                </code>
                Keep in mind that the address is inputed backwards. <br />
                i.e. The BD address <code>98:76:54:32:10:09</code> would be
                inputed as
                <br />
                <code className="flex space-x-2">
                  <div>55 AB 23 87 09 00 30 00 06 </div>
                  <div className="text-amber-600">09 10 32 54 76 98</div>
                </code>
                <br />
              </li>
              <li>
                To see your new address in use, you may need to unplug and
                replug the device before the device utilises the new address
              </li>
            </ol>
          </div>
        </div>
        <div>
          <h3>Conclusion</h3>
          <div>
            That&apos;s it, it is really quite simple, you can now use your
            UB500 or any other Realtek RTL8761B based bluetooth controller with
            a custom BD address.
            <br />
            Many thanks to Xeno Kovah and darkmentor&apos;s research into the
            RTL8761B which made this all possible.
            <br />
          </div>
          <div>
            <br />
            On a side note, I stumbled upon this research while working on my
            project on emulating a Nintendo Switch Pro controller on Windows,
            mostly by trying to port the functionality from NXBT over from
            native Linux Bluez code over to Bumble the unfortunately named
            experimental Google bluetooth library.
            <br />I was unable to progress past an connection to a Switch which
            disconnects after a SDP declaration, but if someone else picks up
            the torch, I would be quite grateful.
          </div>
        </div>
        <div>
          <h3>Sources</h3>
          <ol>
            <li>
              Reverse engineering Realtek RTL8761B* Bluetooth chips, to make
              better Bluetooth security tools & classes (©Dark Mentor LLC 2025)
              <br />
              <a href="https://darkmentor.com/publication/2025-11-hardweario/">
                https://darkmentor.com/publication/2025-11-hardweario/
              </a>{" "}
            </li>
            <li>
              Reverse engineering Realtek RTL8761B* Bluetooth chips, to make
              better Bluetooth security tools & classes (slides) (©Dark Mentor
              LLC 2025)
              <br />
              <a href="https://darkmentor.com/2025-11-21_HardwearioNL2025_RTL8761B_RE_Slides_With_Builds.pdf">
                https://darkmentor.com/2025-11-21_HardwearioNL2025_RTL8761B_RE_Slides_With_Builds.pdf
              </a>{" "}
            </li>
          </ol>
        </div>
      </div>
    </article>
  );
}
