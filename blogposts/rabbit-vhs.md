---
title: 'Down the rabbit-hole: VHS Digitisation'
date: '2024-01-26'
description: 'My brief look into the insane world of VHS digitisation'
---
<p>It all started with a simple project: to digitise and back up some of my childhood moments which recorded through VHS.</p>

<h3>Mini Background</h3>
<ul>
    <li>VHS tapes are very much a legacy medium, and as they age, both the tapes and the players are gradually breaking down.</li>
    <li>VHS digitisation is real-time and is hence very time-consuming, e.g., a 4 hour tape will played for 4 hours</li>
</ul>

<h3>Level-1: Ignorance is bliss</h3>
<blockquote> How hard could it be? </blockquote>
<p> When I started this project, I naively thought that it would be pretty straightforward, all I needed was to 
<ul>
    <li type="1">Purchase a capture card to interface with my old VCR, an old basic Sony.</li>
    <li type="1">Plug the capture card into a pc</li>
    <li type="1">Capture and record the output through OBS.</li>
    <li type="1">Done.</li>
</ul>

<p>So I picked up a unopened Elgato Game Capture HD for $38NZD locally, set it up properly and started digitising.</p>
<p>This should have been my end point, but I got a bit curious: <br />Since it will take a couple of weeks to fully digitise my VHS tapes, I might as well look at what the pros use.</p>

<h3>Level-2: DigitalFaqs</h3>
<blockquote>What have I gotten myself into</blockquote>
<p> I started with a simple search: Best VCRs for VHS digisation.</p>
<p> That led me to a deep rabbit-hole which has consumed hours throughout many weeks, here was what I found.</p>
<h4>VCRs</h4>
<p> My research generally led me to one point: the most complete buyers guide for VCRs I could find: <a href="https://www.digitalfaq.com/forum/video-restore/1567-vcr-buying-guide.html" title="Definitive guide for VCRs">Definitive guide</a></p>
<p> A brief synoposis of the information I learnt:</p>
<ul>
    <li>Generally the most important feature that makes a good VCR: well implemented Time Base Correction (TBC)</li>
    <li>A TBC is a device which corrects and improves the video input fed into it from VHS tapes. <a href="https://www.digitalfaq.com/forum/video-restore/2251-tbc-time-base.html" title="More detailed information on TBCs">More info at Link</a></li>
    <li>Not all TBCs are built equal, there are "Line TBC, frame TBC, frame sync TBC, field TBCs, etc.", and different implementations <a href="https://www.digitalfaq.com/forum/video-capture/12537-tbc-how.html" title="More detailed information on TBCs">More info at Link</a></li>
    <li>The capture card device is also important, though choosing a capture card is more like not purchasing a bad capture card and choosing an option from the "good" models.</li>
    <li>Finally there is the capture software, which is documented well at <a href="https://www.digitalfaq.com/guides/video/introduction-record-capture.htm" title="Guide to capture software and cards">this page here.</a></li>
</ul>

<p>At this point, the sheer amount of research I had done to try make a "optimal" end-to-end system was rather overwhelming.</p>
<p>It was at this point, where I heard of a project named VHS-Decode</p>

<h3>Level-3 VHS-Decode</h3>
<blockquote>I've gone too far</blockquote>
<p>
    When I was trawling through forums, reddit and YouTube, an interesting comment somewhere showed up, talking about VHS-Decode.
</p>
<p>
    VHS-Decode is an interesting project, a fork of LD-Decode, it works by bypassing the VHS's video capabilities althogether and taps into the RF signals used internally by the VHS, before decoding and processing via software.
    <a href="https://github.com/oyvindln/vhs-decode" title="VHS-Decode Github">Official Github page.</a>
</p>

<p>
    VHS-Decode is also a divisive project, it has good intentions in how it wants to lower the barrier through the use of more commodity hardware compared to the traditional capture pipelines. But in its current state, it is anything but perfect, there is still a big barrier of entry in the fact that it requires a VHS to be disassembled and the RF tap points to be soldered onto. There are also forum threads discussing the technical limitations of its current approach, but as a (largely) uninformed 3rd party, <strong>I will not wade into that debate.</strong>
</p>

<h3>Conclusion</h3>
<p>
    After looking into VHS-Decode, I decided to smoke myself out of the rabbit hole I had gotten into.
</p>
<p>
    You, the reader, might be curious to what setup I ended up with after all my research.
    Well, I ended up using a Panasonic DMR-ES35V, which is captured by either an Elgato video capture or Game Capture HD and their respective software.
</p>
<p>
    You might wonder why I ultimately chose such a bad setup, which does not follow any of the recommendations of the research above.
</p>
<p>
    The answer is quite simple, any digitised video, as long as it is watchable, is better than no digitised video.
    I might build a VHS-Decode setup one day, or I might build a traditional digitising pipeline one day.
    But until I do, I at least have a digitised backup of my VHS childhood in case of emergency.
</p>