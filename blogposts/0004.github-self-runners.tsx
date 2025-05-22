import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/codeblock";
import { Metadata } from "@/lib/blogType";

export const metadata: Metadata = {
  title: "Setting up Proxmox self-hosted Github runners for Subtext",
  date: "2025-04-25",
  description: "Documenting how the Subtext self-hosted runners were setup",
  lastUpdate: "2025-05-22",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <div className="space-y-1">
        {/* Header */}
        <h1>{metadata.title}</h1>

        <h4 className="text-xl font-bold">First Published: {metadata.date}</h4>
        <h4 className="text-xl font-bold">
          Last Updated: {metadata.lastUpdate}
        </h4>
        <blockquote> {metadata.description}</blockquote>
      </div>

      <Separator className="my-4 bg-black dark:bg-white" />
      <div>
        <h3>Background</h3>
        <p>
          When I was developing <a href="https://subtextapp.cc">Subtext</a> I
          wanted to set a CI/CD pipeline to automate builds because my
          development branch often had debug flags and features enabled which I
          kept forgetting to disable for production builds.
          <br /> A CI/CD pipeline would generate builds that were theoretically
          production "ready" with the correct flags and require minimal effort
          from me.
        </p>
        <p>
          To answer a pre-empted question: Why not use Github's own hosted
          runners instead of a self-hosted runner? <br />
          Ans: The built application executable is extremely sizable.
          Downloading these executables for testing even with a fast internet
          connection would take ages.
          <br />
          So I had an idea: why not set up a self-hosted runner which saves
          artifacts to a local isolated SMB share after application is built.
        </p>
        <p>
          With that being stated, it is probally important to note that this
          blogpost is to document the 2nd time I set up this pipeline as the
          first attempt somehow catastrophically failed as the proxmox VM
          refused to start after a system reboot.
          <br />
          As such some instructions might be light on details as to why specific
          settings are being chosen.
        </p>
        <h3>Proxmox Setup</h3>
        <div>
          I used fairly standard settings to set up the env for the windows VM:
          <ol>
            <li>OVMF (UEFI) Bios</li>
            <li>q35 Machine Type for PCIE Features</li>
            <li>6 Host Cores and 16gb of RAM</li>
            <li>VirtIO SCSI Controller</li>
            <li>Bridged Network bond</li>
            <li>Windows 11 Enterprise LTSC ISO</li>
          </ol>
          The only thing to note during the installation is that Windows cannot
          see the Virtual disk, and requires the VirtIO Disk driver has to be
          installed (
          <a href="https://pve.proxmox.com/wiki/Paravirtualized_Block_Drivers_for_Windows#Setup_During_Windows_Installation">
            Instructions
          </a>
          )
          <p>
            Another important thing to set up was NVIDIA VGU drivers which I set
            up using this{" "}
            <a href="https://github.com/wvthoog/proxmox-vgpu-installer?tab=readme-ov-file">
              script
            </a>{" "}
            and its accompanying{" "}
            <a href="https://wvthoog.nl/proxmox-vgpu-v3/">blogpost.</a>
          </p>
          <blockquote>
            This is important as I need a NVIDIA driver present for Pytorch to
            actually install the packages which include CUDA support into the
            builds.
          </blockquote>
        </div>
        <h3>Windows VM Setup</h3>
        <h4> Software</h4>
        Apart from the direct dependencies required for my application, there
        are some other necessary pieces which need to be installed <br />
        These include
        <ol>
          <li>
            Rest of the VirtIO Driver Suite (
            <a href="https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers#Wizard_Installation">
              Instructions
            </a>
            )
            <br />
            This is needed for networking to function.
          </li>
          <li>
            The NVIDIA Grid Driver
            <br />
            This is needed for PyTorch to build the application with CUDA
            support.
          </li>
          <li>
            Microsoft Store
            <br />
            This is for installing WinGet and simplify downloading software.
            <br /> Since this is normally not installed in Win 11 LTSC, this
            needs to be re-installed with{" "}
            <CodeBlock variant="nooutline">wsreset -i</CodeBlock>
          </li>
          <li>
            WinGet <br />
            Once the Microsoft Store has been installed, WinGet can be installed
            with the "App Installer" System App within the store.
          </li>
          <li>
            Windows Terminal
            <blockquote className="my-0!">For some terminal QOL</blockquote>
            Install:{" "}
            <CodeBlock>
              winget install --id=Microsoft.WindowsTerminal -e
            </CodeBlock>
          </li>
        </ol>
        <h4>Settings</h4>
        Since this VM is mostly going to be interacted with within QEMU, these
        tweaks from this{" "}
        <a href="https://youtu.be/hVl9B3dTFB4?t=644">TechHut video</a> disabling
        some Windows graphics effects improves the experience greatly.
        <h3>Github Runner Setup</h3>
        <p>
          To download the Github Runner application, follow the instructions
          from the{" "}
          <a href="https://github.com/actions/runner/releases/">
            runner release notes
          </a>
        </p>
        <p>
          Since setting up the Github Runner as a Service lets it auto starts
          when the VM boots, <br />
          Run the config script as Administrator{" "}
          <CodeBlock>
            config.cmd --url "REPO URL HERE" --token "RUNNER TOKEN GOES HERE"
          </CodeBlock>
          <br />
          Additionally, to prevent permission issues running as "NT
          AUTHORITY\NETWORK SERVICE", when the script asks, set the runner to
          run as "NT AUTHORITY\SYSTEM".
        </p>
        <h4>PATH Limitations</h4>
        <p>
          A Limitation to running as a service are restrictions to using the
          PATH
          <br />
          The Github Runner will not be able to access the user PATH.
          <br />
          It appears that the official{" "}
          <a href="https://github.com/actions/runner/issues/2540">
            solution
          </a>{" "}
          is to add your necessary PATH variables to a .env file in the runner
          folder.
        </p>
        <p>
          Given that I will likely be the only person to ever use my runner, I
          found it easier to add a hard-coded path into the script, which is
          enabled when a specific argument is passed to the script.
        </p>
        <blockquote>
          Edit:{" "}
          <div className="not-italic">
            I got tired of reconfiguring this manually each time so I added it
            into the arguments
          </div>
          <CodeBlock>
            ./config.cmd --url https://github.com/jchu634/Subtext-app
            --runasservice --windowslogonaccount "NT AUTHORITY\SYSTEM" --name
            NAME --labels LABELS --replace --token TOKEN
          </CodeBlock>
        </blockquote>
      </div>
      <h3>Exporting Build Artifacts</h3>
      <p>
        One of my stated goals in setting up the runner was to save the build
        artifacts to a local SMB share.
        <br />
        Be it either a skill issue or a Windows Service limitations, I have not
        been able to get this working.
        <br />
      </p>

      <p>
        Instead I found the easiest solution was to utilise syncthing. To
        achieve this,
      </p>
      <ol>
        <li>
          Set up a builds folder ("C:\Builds\Subtext\") and then add a step to
          the Github action to copy artifacts to that folder
        </li>
        <li>
          Make a one-way send syncthing connection between that folder and the
          build folder on the NAS.{" "}
          <a href="https://docs.syncthing.net/index.html">
            (Syncthing Documentation)
          </a>
        </li>
      </ol>

      <h3>Conclusion</h3>
      <p>
        In the end this is how I set up a Github Self-Hosted runner in Windows
        for <a href="https://subtextapp.cc">Subtext</a>.<br />
        If I were ever to need to redo this again, I would properly set up the
        env file to properly fix the Path issues.
        <br />
        All in all, I am quite happy with how it turned out, and it works quite
        well.
      </p>
      <h3>Notes</h3>
      <h4>Github Runner Issues</h4>
      <blockquote>
        Edit:
        <div className="not-italic">
          The cause of this issue was due to the VM's incorrect time.
          <br />I do not leave the VM on 24/7 (Electricity is expensive) so when
          I actually turn on the VM
          <br />
          When the VM boots, the Github Runner automatically runs, finds the
          incorrect time and then forcibly removes the runner. (
          <a href="https://github.com/jchu634/Actions-Service-Start">My Fix</a>)
        </div>
      </blockquote>
      <p>
        When I was setting up the runner, I kept needing to restart Windows as I
        installed new dependencies. <br />
        One time, I started Windows and the Github Runner Service stopped
        working as it reported that the repo had removed the runner.
        <br />
        When I checked on the repo settings, the runner was still assigned.
        <br />
        To fix this, I removed the runner and reconfigured the runner using the
        script.
        <br />I have not been able to recreate this bug since.
      </p>

      <h4>Implementation Notes</h4>
      <p>
        I wanted to note some implementation details that I improved from the
        first attempt
      </p>
      <ol>
        <li>
          The minimum amount of RAM for a good experience seems to be a minimum
          of 16GB, 8GB of ram in Windows 11 is really not enough.
        </li>
        <li>
          The bottleneck in the build pipeline for Subtext in my experience
          tends to be CPU-based as the Innosetup and 7Zip compression step tends
          to be take the longest. <br />
          As such, it is recommended to allocate as many CPU cores to the VM as
          possible.
        </li>
      </ol>
    </article>
  );
}
