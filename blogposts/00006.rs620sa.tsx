import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import FigureWithCaption from "@/components/ui/captioned-image";

export const metadata: Metadata = {
  title: "ASUS RS620SA-E10-RS12 2U6N EPYC Server Review?",
  date: "2025-06-19",
  description: "A unique 2U6N EPYC Rome/Milan Server.",
  lastUpdate: "2025-06-19",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <h3>Background</h3>
        <p>
          I found a great deal on a great condition and rather unique server on
          eBay. The server appeared to be new/old stock with upgraded config.
          <br />
          Afterwards, I was curious and did a bit of searching but didn't find
          basically any coverage about this server anywhere.
          <br />
          So here is my overview/review.
        </p>
        <h3>Intro</h3>
        <p>
          The ASUS RS70SA-E10-RS12 is a extremely high density 2u 6 node EPYC
          SP3 server. It supports EPYC Rome/Milan. <br />
          According to its press release, it is world's first 2U6N Server and to
          be fair, I haven't been able to find any other 2U6N servers.{" "}
          <sup>
            <a href="https://www.asus.com/nz/news/8zde5ol1snpde80o/">(Link)</a>
            <a href="https://web.archive.org/web/20250619083410/https://www.asus.com/nz/news/8zde5ol1snpde80o/">
              (Archive)
            </a>
          </sup>
        </p>
      </div>
      <div>
        <h3>Server Exterior</h3>
        <div className="items-start lg:flex">
          <div>
            The front of the chassis hosts two 1U nodes, and a cage for 12 2.5'
            inch SAS/SATA/NVME Drives, two for each node. These are not toolless
            caddies.
            <br />
            These are NVMe internally with a Broadcom SAS3008 converting to
            SAS/SATA
            <FigureWithCaption
              src={"/blogs/6/ASUS RS620SA Front View.png"}
              aspectRatio={"aspect-[2086/758]"}
              className="not-prose block lg:hidden"
              figureWidth="w-full"
              caption={"ASUS RS620SA-E10-RS12 Front"}
            />
            <br />
            The rack ears are each equipped with 5 buttons on each side,
            <ul>
              <li>
                2 buttons for easy access power control for the rear nodes
              </li>
              <li>
                3 buttons for locating server nodes (They toggle an LED on their
                respective node)
              </li>
            </ul>
            Additionally, the rack ears each have a pull handle, which is
            extremely useful with servicing and maintence, as the server is
            quite heavy and it helps avoid accidental button presses.
          </div>

          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Front View.png"}
            aspectRatio={"aspect-[2086/758]"}
            className="not-prose hidden lg:block"
            figureWidth="w-full"
            caption={"ASUS RS620SA-E10-RS12 Front"}
          />
        </div>
        <div>
          <br />
          On the rear of the chassis you can access the redundant power supplies
          and the other 4 server nodes in this chassis.
          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Rear View.png"}
            aspectRatio={"aspect-[1949/649]"}
            figureWidth="w-full"
            className="not-prose"
            caption={"ASUS RS620SA-E10-RS12 Rear"}
          />
          This particular unit is equipped with a 2200W 80+ Platinum DELTA PSU.
          According to the QVL, this chassis can also be equiped with a 3000W
          80+ Titanium GOSPOWER unit.
          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Power Supply 2.jpg"}
            aspectRatio={"aspect-[4/3]"}
            figureWidth="sm:w-1/2 w-full"
            className="not-prose"
            caption={"ASUS RS620SA-E10-RS12 Power Supply"}
          />
        </div>
        <div>
          A rather interesting feature about this chassis is its built-in
          slide-out cable management channel, which routes cables from the front
          2 nodes back to the rear.
          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Cable Management.png"}
            aspectRatio={"aspect-[1491/978]"}
            figureWidth="md:w-1/2 w-full"
            className="not-prose"
            caption={"ASUS RS620SA-E10-RS12 Cable Management"}
          />
          My particular unit's cable management was equipped with two SFP28 male
          to female cables.
          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Cable Management Cable.jpg"}
            aspectRatio={"aspect-[1972/1110]"}
            figureWidth="md:w-1/2 w-full"
            className="not-prose"
            caption={"ASUS RS620SA-E10-RS12 Custom SFP28 Cables"}
          />
          These cables are quite interesting as I have been unable to find any
          other similar male to female SFP28 cables. Additionally, I don't know
          if these come stock, as my unit does not appear to be the base config.
        </div>
      </div>
      <div>
        <h2>Chassis Internals</h2>
        <h3>Chassis Backplane</h3>
        <div className="items-start lg:flex">
          <div>
            There are four 80mm 16K RPM 6Pin hot swappable Delta fans in this
            system.
            <br />
            Also visible are the CB8LX12G-R2H-B NVME to SAS/SATA boards for the
            backplane. It is interesting that there are 3 boards, one per 2
            nodes.
            <br />
            Another notable detail are that there are two midplane boards, for
            handling the back and front nodes respectively.
            <FigureWithCaption
              src={"/blogs/6/ASUS RS620SA Backplane.jpg"}
              aspectRatio={"aspect-[911/1161]"}
              figureWidth="sm:w-1/2 w-full"
              className="not-prose"
              caption={"ASUS RS620SA-E10-RS12 Backplane"}
            />
          </div>
        </div>
        <div>
          <h3>Node Overview</h3>
          <h4>External</h4>
          <div>
            Each node has a power button, VGA port, two USB 3.2 Gen 1 slots, a
            dedicated IPMI port and a 1GB LAN port . The nodes also have a very
            useful and notable featre: a 7 segment POST-code screen.
            <FigureWithCaption
              src={"/blogs/6/ASUS RS620SA Node IO.jpg"}
              aspectRatio={"aspect-[2353/759]"}
              figureWidth="w-full"
              className="not-prose"
              caption={"ASUS RS620SA-E10-RS12 Node IO (Top IPMI, Bottom LAN)"}
            />
          </div>
          <h4>Internal</h4>
          <div>
            Each node has a single SP3 socket and has 8 memory channels
            supporting DDR4 3200 with up to 4096GB with 512GB LRDIMMs.
            <br />
            Note: The node pictured only has 2 DIMMS installed as I used it as a
            test, and the rest of my ram was deployed elseware.
            <div className="sm:flex sm:space-x-2">
              <FigureWithCaption
                src={"/blogs/6/ASUS RS620SA Unpopulated Node.jpeg"}
                aspectRatio={"aspect-[16/9]"}
                figureWidth="w-full"
                className="not-prose"
                caption={"ASUS RS620SA-E10-RS12 Unpopulated Node"}
              />
              <FigureWithCaption
                src={"/blogs/6/ASUS RS620SA Populated Node.jpg"}
                aspectRatio={"aspect-[16/9]"}
                figureWidth="w-full"
                className="not-prose"
                caption={"ASUS RS620SA-E10-RS12 Populated Node"}
              />
            </div>
            As for expansion slots, each node has a PCIE Gen4 x16 OCP 3.0
            expansion slot for networking, <br />
            a PCIE Gen4 x16 half length low profile expansion slot through a
            riser card.(Since the nodes do not supply any additional PCIE power,
            cards are limited to 75W.)
            <br /> and finally a riser card with 2 M.2 slots, with each slot
            supporting up to 22110, with SATA or a PCIE Gen 4x4 link.
            <div className="sm:flex sm:space-x-2">
              <FigureWithCaption
                src={"/blogs/6/ASUS RS620SA M.2 Side 1.jpg"}
                aspectRatio={"aspect-[1804/571]"}
                figureWidth="sm:w-1/2 w-full"
                className="not-prose"
                caption={"ASUS RS620SA-E10-RS12 M.2 Riser Card Side 1"}
              />
              <FigureWithCaption
                src={"/blogs/6/ASUS RS620SA M.2 Side 2.jpg"}
                aspectRatio={"aspect-[1831/475]"}
                figureWidth="sm:w-1/2 w-full"
                className="not-prose"
                caption={"ASUS RS620SA-E10-RS12 M.2 Riser Card Side 2"}
              />
            </div>
            <h4>Misc</h4>
            It is interesting to see a physical TPM module instead of a firmware
            fTPM.
            <br />
            Also the VGA comes from a header instead of being soldered.
            <FigureWithCaption
              src={"/blogs/6/ASUS RS620SA Node VGA TPM.jpg"}
              aspectRatio={"aspect-[16/9]"}
              figureWidth="sm:w-1/2 w-full"
              className="not-prose"
              caption={"ASUS RS620SA-E10-RS12 VGA and TPM"}
            />
            Also the Node backplane connectors
            <FigureWithCaption
              src={"/blogs/6/ASUS RS620SA Node backplane connector.jpg"}
              aspectRatio={"aspect-[2057/795]"}
              figureWidth="sm:w-1/2 w-full"
              className="not-prose"
              caption={"ASUS RS620SA-E10-RS12 Node Backplane Connector"}
            />
          </div>
        </div>
        <div>
          <h2>Management</h2>
          Each node has a ASPEED AST2500 BMC running ASUS's management solution
          which appears to be based on MegaRAC SP-X.
          <br />
          Note the LANNCSI Jumper on the right of the AST2500, which controls if
          management is accessible from the Gigabit i210 LAN or the OCP NIC.
          <FigureWithCaption
            src={"/blogs/6/ASUS RS620SA Node ASPEED.jpg"}
            aspectRatio={"aspect-[4/3]"}
            figureWidth="sm:w-1/2 w-full"
            className="not-prose"
            caption={"ASUS RS620SA-E10-RS12 Node ASPEED AST2500"}
          />
          I won't review or show the IPMI interface as it has been extensively
          covered by STH{" "}
          <a href="https://www.servethehome.com/asus-esc4000a-e10-2u-amd-epyc-nvidia-gpu-server-review/3/">
            here
          </a>
          <blockquote>
            Note: I have/had a couple of issues with managing this server.
            <ol>
              <li>
                I have been unable to get access the IPMI from the IPMI
                interface. I have only been able to get the IPMI to work through
                a setting to have the LAN share the IPMI access. (I fully
                acknowledge it may very well a PEBCAK.)
              </li>
              <li>
                I have an issue where the BIOS is horribly slow when physically
                connected to the VGA output where I can actually see the
                interface slowly update line by line. This is particularly a
                problem when moving across menu tabs as each menu tab renders
                sequentialy until you reach your desired tab. Notably, this does
                not show when accessing the BIOS via the IPMI iKVM.
              </li>
            </ol>
          </blockquote>
        </div>
        <div>
          <h3>Performance</h3>
          Now Lets talk about performance numbers:
          <br />
          ...I don't have any.
          <br />I can't stress test this system in any scenario.
          <br />
          <ul>
            <li>
              This system is designed for high density usage. <br />
              But I can't run more than 4 nodes as I don't have access to a 16A
              outlet.
              <blockquote>
                For those curious on how I run this server without 16A despite
                the PSU requiring a 16A C19 cable: I use a C19 to C14 cable and
                never more than 3 or 4 nodes at once.
              </blockquote>
            </li>
            <li>
              Each node was seemingly designed for GPU inference or significant
              CPU compute.
              <br />
              But, simply put, I don't have the CPU or GPU hardware to test a
              node properly and do it justice as its expensive.
              <br />
              If I ever get the hardware to give it a proper shot, I may update
              this blog appropriately.
            </li>
          </ul>
          <h3>Power Usage/Efficiency</h3>
          Sorry, I can't test this either.
          <br />
          None of my PDUs have power-monitoring and I can't use a standard power
          meter as I use a C19 to C14 cable.
          <br />
          At release, ASUS did claim this to have world’s highest SPEC Power
          ranking for energy efficiency for a high-density server powered by
          AMD® EPYC™ 7002 processors.
          <sup>
            <a href="https://www.asus.com/nz/news/8zde5ol1snpde80o/">(Link)</a>
            <a href="https://web.archive.org/web/20250619083410/https://www.asus.com/nz/news/8zde5ol1snpde80o/">
              (Archive)
            </a>
          </sup>
          <br />
          Although I can't verify this, I don't see any reason why this would be
          wrong given their careful wording, but time passes and a newer
          Rome/Milan server may have beaten their title.
        </div>
        <div>
          <h2>Conclusion</h2>
          This is a very interesting if obscure server. It is a first of its
          kind, (2U6N) and perhaps the last of its kind.
          <br />
          ASUS has transitioned back to 2U4N for its latest generations{" "}
          <a href="https://www.servethehome.com/cxl-paradigm-shift-asus-rs520qa-e13-rs8u-2u-4-node-amd-epyc-server-review/">
            (Link).
          </a>
          <br />
          I strongly suspect the reason was due to the much larger SP5 socket.
          <br /> Although in my opinion, one of the possible factors is that I
          don't think the RS620SA sold particularly well considering that there
          is the lack of BIOS/BMC updates since 2022 despite other ASUS EPYC
          servers released in the same timeframe getting updates.
          <br />
          <br />
          Despite this, I am very happy with my purchase, I got it for a
          relative bargain, and it is perfect for my needs: a capable server
          platform which I can easily spin up Nodes as easily as I can spin up
          VMs.
          <br /> Which is particularly useful as I am increasingly experimenting
          with interesting 75W PCIE cards, and this system is amazing as
          essentially 6 workstations in a tiny 2u form-factor with different
          pieces of hardware, which I can spin up/down over the network at any
          time.
        </div>
      </div>
    </article>
  );
}
