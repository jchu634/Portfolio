import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";

export const metadata: Metadata = {
  title: "Migrating a Proxmox Forbidden Router",
  date: "2025-10-20",
  description: "Ah F*, The consequences of my actions.",
  lastUpdate: "2025-10-20",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <h3>Background</h3>
        <p>
          I have been running a forbidden router
          <sup>
            <a href="https://www.youtube.com/watch?v=r9fWuT5Io5Q">1</a>
          </sup>{" "}
          for some time on a SYS-5019A-FTN4 for some time.
          <br />I primarily use it to run my non-storage based services, but now
          I am gradually hitting its limits and I want to slowly transition my
          LAN to utilise 10Gb.
          <br />
          So I purchased a Minisforum MS-01.
          <br />
          Now the issue is that I now need to migrate my services to the new
          machine while targetting minimal downtime and configuration changes
          (primarily to minimise ip changes).
        </p>
      </div>
      <div>
        <h2>OPNSense Migration</h2>
        <p>
          This was the painful one.
          <br />I had a complex to migrate setup with a passed through physical
          NIC, VPN solutions and VLANS that rely on the physical NIC.
        </p>
        <p>
          Let me lay out the plan first: I would switch from passing through a
          physical NIC to using virtual bridges.
          <br />
          There would be two virtual bridges, one for the WAN interface (RJ45
          1GB) and one for LAN (SFP+ 10GB).
          <br />
          To achieve this I also wanted to migrate the VM image itself instead
          of only migrating the config as that would minimise downtime.
        </p>
        <h3>Process</h3>
        <p>With that said, let me go through the steps I did to migrate it. </p>
        <ol>
          <li>
            Create a backup file of the VM
            <br />
            <CodeBlock className="w-fit pr-10" language="bash">
              vzdump 101 --mode stop --compress zstd --storage local
            </CodeBlock>
          </li>
          <li>
            Copy the backup file from the old proxmox machine to the new one
            <br />
            <CodeBlock className="w-fit pr-10" language="bash">
              scp root@OLD-IP:/var/lib/vz/dump/* /var/lib/vz/dump/
            </CodeBlock>
          </li>
          <li>
            Copy the backup file from the old proxmox machine to the new one
            <br />
            <CodeBlock className="w-fit pr-10" language="bash">
              qmrestore /var/lib/vz/dump/BACKUP_FILE_NAME.vma.zst 101 --storage
              local-lvm
            </CodeBlock>
          </li>
          <li>
            Set up the Bridges by modifying <code>/etc/network/interfaces</code>{" "}
            to include
            <CodeBlock className="w-fit pr-10" language="ini">
              {`auto enp87s0 iface
eno1 enp87s0 manual

auto vmbr1
iface vmbr1 inet manual
  bridge-ports enp87s0 
  bridge-stp off
  bridge-fd 0

auto enp2s0f1np1 iface
eno1 enp2s0f1np1 manual

auto vmbr2
iface vmbr2 inet manual
  bridge-ports enp2s0f1np1 
  bridge-stp off
  bridge-fd 0`}
            </CodeBlock>
            Note: enp2s0f1np1 is the 10Gb SFP and enp87s0 is the 1Gb RJ45
          </li>
          <li>
            Assign the bridges to the VM
            <CodeBlock className="w-fit pr-10" language="bash">
              {`qm set 101 -net0 virtio,bridge=vmbr1 # WAN
qm set 101 -net1 virtio,bridge=vmbr2 # LAN`}
            </CodeBlock>
          </li>
          <li>
            Then I removed the physical passthrough NIC via the Proxmox Hardware
            settings for the VM and finally could boot OPNSense.
            <br />I first attempted to assign interfaces via Option 1. (Assign
            Interfaces) but that erased a bunch of my configs and just was
            difficult to get working.
            <br />
            So instead choose Option 8. (Shell) and modify{" "}
            <code>/conf/config.xml</code>
            <CodeBlock className="w-fit pr-10" language="bash">
              vi /conf/config.xml
            </CodeBlock>
            and then scroll down until you get to interfaces and change the lan
            interface to the new network interface (in my case vtnet1)
            <CodeBlock className="w-fit pr-10" language="bash">
              {`<interfaces>
  <lan>
    <if>vtnet1></if>
    <descr>LAN</descr>
    ....`}
            </CodeBlock>
            Then shut down your original OPNSense and reboot OPNSense.
          </li>
          <li>
            OPNSense should now have picked up the new LAN configuration and the
            Web interface should now be available.
            <br />
            From there you can fix your WAN interfaces. I won't provide the
            steps for this as my WAN setup is likely quite different from
            standard to talk with my ISP network.
          </li>
        </ol>
        <p>
          Now that the migration is complete, you can delete the backup from
          both proxmox machines as it is not needed anymore
        </p>
      </div>
      <div>
        <h2>Pihole migration</h2>
        <p>My particular pihole setup is using a LXC</p>
        <h3>Process</h3>
        <p>
          I tried several times to restore from a VM backup file but it failed
          due to an issue with permissions and spacec.
          <br />
          Since I have experience in migrating pihole between machines, I knew
          it was likely much easier to restore from a config, as generally
          PiHole has much less to configure.
          <br />
          (Note: It may be more difficult if you use pihole with unbound as a
          recursive DNS, I used OPNSense's built in Unbound DNS server instead.
          )
        </p>
        <ol>
          <li>
            Create a new Pihole instance, I use the proxmox community script for
            this
            <br />
            <CodeBlock className="w-fit pr-10" language="bash">
              https://community-scripts.github.io/ProxmoxVE/scripts?id=pihole
            </CodeBlock>
          </li>
          <li>
            OPTIONAL: Static IP
            <br />I prefer my pihole to use static IPs so I use the advanced
            setup and randomly assign a static ip as I will change it later.
          </li>
          <li>
            Log in to your old pihole instance and export your config in{" "}
            <code>Settings&gt;Teleporter</code>
            <br />
            Then log into the web interface of your new pihole instance and
            import your config in <code>Settings&gt;Teleporter</code>
          </li>
          <li>
            Now we are ready to make the new pihole take over from the older
            pihole instance.
            <br />
            Modify <code>eth0</code> in <code>/etc/network/interfaces</code>
            with your old ip address and save.
            <CodeBlock className="w-fit pr-10" language="bash">
              nano /etc/network/interfaces
            </CodeBlock>
          </li>
          <li>
            Then restart your network stack to use the new IP
            <CodeBlock className="w-fit pr-10" language="bash">
              sudo ifdown eth0 && sudo ifup eth0
            </CodeBlock>
          </li>
          <li>
            finally shut down your old pihole instance to prevent a ip clash.
          </li>
        </ol>
      </div>
      <div>
        <h2>haos migration</h2>
        <p>The simplest migration of all.</p>
        <h3>Process</h3>

        <ol>
          <li>
            Create a manual backup in{" "}
            <code>System&gt;Backups&gt;Backup Now</code>
          </li>
          <li>Download your backup</li>
          <li>
            Create a new HAOS instance, personally I use the community proxmox
            script for this
            <CodeBlock className="w-fit pr-10" language="bash">
              bash -c "$(curl -fsSL
              https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/vm/haos-vm.sh)"
            </CodeBlock>
          </li>
          <li>
            When you boot up HAOS, choose to setup by restoring from a backup.
          </li>
        </ol>
      </div>
      <div>
        <h2>Conclusion</h2>
        <p>
          Migrating most things over using proxmox is relatively simple, and
          thats a pretty good thing.
          <br />I have been using a forbidden router for many years already and
          it has saved me several times when I needed to do a rollback from a
          faulty config.
          <br />
          This is the first time it has bitten me back, and that was because I
          chose to passthrough a physical nic instead of assigning it like in
          proxmox.
          <br /> In the future I will probally switch back to a physcial NIC as
          Minisforum has done a pretty good job with SR-IOV so I can
          individually pass through a single interface, but for now I am
          satisfied.
        </p>
      </div>
    </article>
  );
}
