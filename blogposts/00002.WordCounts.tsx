import { Separator } from "@/components/ui/separator";
import { Metadata } from "@/lib/blogType";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Word Counts are a mess",
  date: "2024-05-20",
  description: "Why are word counts different between different software",
  lastUpdate: "2024-11-10",
};
export default function Post() {
  const tableHeaders = [
    "Header/Footer",
    "Textbox in Header",
    "Headings",
    "Text",
    "List",
    "Numbered list",
    "Table Of Contents",
    "Tables",
    "Citation Mark",
    "Equations",
    "Links",
    "SlashSeperatedWords",
    "Acroynms",
    "Bibliographies",
    "Captions",
    "Footnotes",
    "EndNotes",
    "WordArt",
    "Textbox",
    "Comments",
    "Page Numbers",
    "Sub/SuperScript",
  ];
  const docxData = [
    {
      software: "Word (Desktop)",
      // prettier-ignore
      results: [
        "❌", "❌", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "❌", "✔️","One Word", "One Word", "One Word", "✔️", "✔️", "✔️", "✔️", "✔️","✔️", "❌", "❌", "One Word"
      ],
    },
    {
      software: "Word (Online)",
      // prettier-ignore
      results: [
        "❌", "❌", "✔️", "❌", "✔️", "✔️", "✔️", "✔️", "❌", "❌","One Word", "One Word", "One Word", "✔️", "❌", "✔️", "✔️", "❌","❌", "❌", "❌", "One Word"
      ],
    },
    {
      software: "Libre",
      // prettier-ignore
      results: [
        "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "❌","One Word", "One Word", "One Word", "✔️", "✔️", "✔️", "✔️", "✔️","✔️", "❌", "✔️", "One Word"
      ],
    },
    {
      software: "Google Docs",
      // prettier-ignore
      results: [
        "❌", "❌", "✔️", "✔️", "⭕ (No Bullets)", "⭕ (No Bullets)", 
        "✔️", "✔️", "❌", "✔️", "Separate", "Separate", "Separate","✔️", "❌ (Not Imported)", "❌", "❌", "❌ (imported as drawing)","❌ (imported as drawing)", "❌", "❌", "One Word"
      ],
    },
    {
      software: "Apple Pages",
      // prettier-ignore
      results: [
        "❌", "✔️", "✔️", "✔️", "⭕ (No Bullets)", "⭕ (No Bullets)","✔️/❌ (Only Title counts)", "✔️", "❌", "❌", "Separate","Separate", "Separate", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️","❌", "❌", "One Word"
      ],
    },
  ];

  const docData = [
    {
      software: "Word (Desktop)",
      // prettier-ignore
      results: [
        "❌","❌","✔️","✔️","✔️","✔️","✔️","✔️","❌","N.A.","One Word","One Word","One Word","✔️","✔️","✔️","✔️","✔️","✔️","❌","❌","❌",
      ],
    },
    {
      software: "Word (Online)",
      results: Array(tableHeaders.length).fill("N.A."),
    },

    {
      software: "Libre",
      // prettier-ignore
      results: [
        "✔️","✔️","✔️","✔️","✔️","✔️","✔️","✔️","✔️","N.A.","One Word","One Word","One Word","","✔️","✔️","✔️","✔️","✔️","❌","✔️","❌",
      ],
    },
    {
      software: "Google Docs",
      // prettier-ignore
      results: [
        "❌","❌","✔️","✔️","⭕ (No Bullets)","✔️ (Bullets Don't Count)","✔️","✔️","❌","N.A.","Separate","Separate","Separate","✔️","❌ (Imported, But with a quirk)","❌","❌","❌ (imported as drawing)","❌ (imported as drawing)","❌","❌","❌",
      ],
    },
    {
      software: "Apple Pages",
      // prettier-ignore
      results: [
        "❌","✔️","✔️","✔️","⭕ (No Bullets)","⭕ (No Bullets)","✔️/❌ (Only Title counts)","✔️","❌","❌","Separate","Separate","Separate","✔️","✔️","✔️","✔️","✔️","✔️","❌","❌","One Word",
      ],
    },
  ];
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <div className="space-y-1">
        <h1>{metadata.title}</h1>

        <h4 className="text-xl font-bold">First Published: {metadata.date}</h4>
        <h4 className="text-xl font-bold">
          Last Updated: {metadata.lastUpdate}
        </h4>
        <blockquote> {metadata.description}</blockquote>
      </div>

      <Separator className="my-4 bg-black dark:bg-white" />
      <div>
        <div>
          <h2>Background</h2>

          <p>
            Word counts are a mess.
            <br /> Once in a Uni assignment, I had to submit an accurate word
            count along with the assignment.
            <br />
            This proved impossible as each document software gave different word
            counts and there was no way I was going to manually count an approx
            ~600 word document.
            <br />
            Afterwards, I was curious as to why each software gave different
            word counts, so I decided to do some testing.
            <br />
            <br />
            This blogpost is a collation of my findings.
          </p>

          <h3>Testing Methodology:</h3>
          <p>
            My testing was not quite scientific, but I tried to at least be
            consistent.
            <br />
            I standardised using document formats .DOCX and .DOC as it is quite
            popular due to Microsoft Office&apos;s dominance and is well
            supported by most software.
            <br />I then chose a selection of popular office document software
            then tested each software (Word Desktop, Word Online, Libre Office,
            Google Docs, Apple Pages).
          </p>

          <p>
            For each software, I first started with a sanity check: a simple
            DOCX document with a 100 word story.
            <br />
            This acted as a litmus test to check if there weren&apos;t any
            significant issues with the software.
          </p>

          <p>
            Then came the benchmark: a DOCX document with every feature I could
            think of which has a word count of 219 (counted manually).
            <br />
            This DOCX document was then converted into a DOC document (via Word
            Desktop) to see if there were any significant differences.
          </p>

          <h3>Limitations and Expectations:</h3>
          <p>
            This benchmark is not a real-world document, any word count
            generated from the benchmark will be wrong.
            <br />
            This is <strong>by design</strong> as I added as many tricks to try
            and trip up software to find edge cases.
            <br />
            The main point of this exercise is to find the differences in how
            each software measures word counts through a stress test and not to
            find the actual word count of the document as that is quite
            subjective.
          </p>

          <p>
            That being said, let me list and explain some certain unknowns
            <br />
            (Things that shouldn&apos;t count as a word, but as long as the
            software is consistent is counted as correct within reason).
          </p>

          <p>They include</p>
          <ul>
            <li>
              Bullet points (&amp; Numbered lists): Should the bullet or the
              number count as a word?
              <blockquote>Personally I think they shouldn&apos;t</blockquote>
            </li>
            <li>
              Headers and footers: Should they be counted once or for each page?
              <blockquote>
                I think it technically should count for each page, but as a
                student, I would prefer if they don&apos;t
              </blockquote>
            </li>
            <li>
              Do words/separated/by/slashes/count as separate words or one big
              word?
            </li>
            <li>
              Do words.separated.by.dots.count as separate words or one big
              word?
              <blockquote>
                These two inclusions may seem pedantic, but they are important
                as they signify if URLs or Acroynms count as a single word or
                multiple.
              </blockquote>
            </li>
          </ul>

          <h2>Results</h2>
          <p>
            Now here we get to the meat of the blogpost, the results of the
            testing.
          </p>

          <h4>.DOCX</h4>
          <ul>
            <li>Word (Desktop App)(Office 365 Enterprise): 170</li>
            <li>Word (Website): 126</li>
            <li>Libre: 187</li>
            <li>Google Docs: 135</li>
            <li>Apple Pages: 154</li>
          </ul>

          <h4>.DOC</h4>
          <ul>
            <li>Word (Desktop App)(Office 365 Enterprise): 166</li>
            <li>Word (Website): Not Supported at all</li>
            <li>Libre: 187</li>
            <li>Google Docs: 131</li>
            <li>Apple Pages: 154</li>
          </ul>

          <h3>Observations</h3>
          <p>
            Now that we have the results, I have to say that I am quite
            surprised by the results.
            <br />
            There is a massive range between the word counts (126-187), and
            supprisingly, there is no difference between .DOC and .DOCX.
            <br />
            The difference in Google Docs and Word Desktop is due to lack of
            equations in the .DOC due to the conversion process.
            <br />
            Because of this, I will only be discussing the .DOCX results, lets
            have some fun and look at the quirks of each software:
          </p>

          <h3>Word (Desktop + Online)</h3>
          <h4>Discussion</h4>
          <p>
            A rather interesting quirk is that Word (Desktop) and Word (Online)
            have different word counts.
            <br />
            This quirk was the main motivation for this blogpost, as this caused
            much grief in my assignment. In my testing and{" "}
            <a href="https://answers.microsoft.com/en-us/msoffice/forum/all/differences-in-word-count-in-word-online-and-word/0370e8af-8873-4d52-acfc-c64890bf7c7b">
              research
            </a>
            , I found that Word Online doesn&apos;t count words in text boxes,
            headers, footers and SmartArt.
            <br />I found this rather strange, as I felt the main point of Word
            Online was to compete with Google Docs with its collaborative
            features. And for students which are a major target for the Office
            suite, this inconsistency is quite annoying as groups may be working
            on the same document in Word Online and Word Desktop, and the word
            count would be different between the two.
          </p>

          <p>
            As an aside, during testing I found a strange quirk in Word Online:
            <br />
            Inexplicably, Word Online doesn&apos;t counts bullets from
            bulletpoints, but it does count numbers from numbered lists.
            <br />
            This is almost certainly a bug, but I have no idea if the intended
            behaviour was to count the bulletpoints or to not count list markers
            at all.
          </p>

          <h4>Notable Behaviours</h4>
          <ol>
            <li>
              Word (Desktop+Online) don&apos;t count words from headers and
              footers
            </li>
            <li>
              Word (Desktop+Online) since Word 2003 has counted bullets as a
              separate word (
              <a href="https://answers.microsoft.com/en-us/msoffice/forum/all/exclude-bullet-points-from-word-count/e3f69a7b-3a7e-4219-93b4-a84b67809bc5">
                Source
              </a>
              )
            </li>
            <li>
              Word Online does not count words in equations, captions, WordArt,
              and textboxes.
            </li>
          </ol>

          <h3>Libre Office</h3>
          <h4>Discussion</h4>
          <p>
            Libre Office is rather impressive, as it caught almost every trick I
            threw at it. (Even the textbox in the header!)
            <br />I could only find 3 flaws in its wordcount, and some of those
            flaws are subjective whether they should be counted or not.
          </p>

          <ol>
            <li>Words in equations were not counted.</li>
            <li>Citation marks were counted.</li>
            <li>The page number is counted.</li>
          </ol>

          <p>
            The first flaw I feel is valid as even if equations are not counted,
            words in equations should be counted or else I could just write an
            entire essay in an equation and bypass any wordcount requirements.
          </p>

          <p>
            The second flaw, although more subjective, I feel is definitely
            incorrect as I feel that citation marks should be considered
            punctuation and should not be counted.
            <br />
            At the very least, this behaviour is uniqe among all the software
            tested.
            <br />
            (Citation Marks are the numbers next to a text which indicate
            citations, e.g. study<sup>1</sup>)
          </p>

          <p>
            Finally I can&apos;t quite articulate an explanation for the third
            flaw, but it is &quot;just wrong&quot;.
          </p>

          <p>
            Note: Although Libre Office has the most inclusive wordcount
            algorithm, I have to say it was the most annoying for me to use and
            test
            <br />
            as it has the rather annoying behaviour of not updating the word
            count after undoing anything.
          </p>

          <h4>Notable Behaviours</h4>
          <ol>
            <li>
              Almost all inclusive
              <blockquote>
                Almost everything that I added in the document that should count
                towards an word count is counted
              </blockquote>
            </li>
            <li>Equations are not counted</li>
            <li>
              Sometimes has unique ideas on what should be counted as a word
            </li>
          </ol>

          <h3>Google Docs</h3>
          <h4>Discussion</h4>
          <p>
            Before I get to wordcounts, I have to note that Google Docs has its
            own unique approach to .DOCX compatibility.
            <br />
            Google Docs, I assume was never meant to compete directly with Word,
            but rather to offer collaboration as its main selling point
            <br />
            because of that it often has its own implementations of many DOCX
            features.
          </p>

          <p>Some of the ways it handles .DOCX are:</p>
          <ul>
            <li>
              Textboxes and WordArt are imported as a &apos;Drawing&apos;, a
              construct unique to Google Docs afaik.
            </li>
            <li>Captions are not imported.</li>
            <li>
              Tables nested in Textboxes are not imported and are missing.
            </li>
          </ul>

          <p>Now the quirks in its wordcounts:</p>
          <ul>
            <li>
              Similar to the Word suite, it doesn&apos;t count header/footers.
            </li>
            <li>Uniquely, it doesn&apos;t count words in foot/Endnotes</li>
          </ul>

          <p>
            But here&apos;s the real kicker:
            <br />
            It counts links and Acroynms as separate words, <br />
            i.e. this link:{" "}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </a>{" "}
            which counts as 1 word in Word counts as 7 words in Google Docs.
            <br />
            This is especially egregious as it would inflate the word count of
            any documents with links, which is especially bad as it would count
            links in a Bibliography or a references section.
          </p>

          <h4>Notable Behaviours</h4>
          <ul>
            <li>
              Bullets/Numbers, Headers/Footers, Foot/Endnotes are not counted
            </li>
            <li>Slash and Dot separated words are counted separately</li>
            <li>Words in drawings are not counted.</li>
            <li>
              .DOC compatibility:
              <ul>
                <li>
                  The software with a .DOC compatibility quirk, it managed to
                  import the picture caption, but it imported it distorted and
                  incorrectly as shown below <br />
                  <img
                    src="/BlogImages/WordCountImage3.png"
                    alt="Distorted Picture Caption"
                    title="Distorted Picture Caption"
                  />
                </li>
              </ul>
            </li>
          </ul>

          <h3>Apple Pages</h3>
          <h4>Discussion</h4>
          <p>
            In comparison to Google Docs, Apple Pages seems much tamer in how it
            imports elements from .DOCX documents.
            <br />
            The only issue I had with imports were tables nested in textboxes,
            which imported the table as a text representation.
            <br />
            This is rather minor, as Pages gives an warning in advance.
          </p>

          <p>
            That&apos;s where the good news ends as Apple Pages is inconsistent
            in its word count.
          </p>
          <ul>
            <li>
              It somehow counted text in textboxes nested inside the header,{" "}
              <strong>
                but it didn&apos;t count any other words in the header
              </strong>
              .
            </li>
            <li>
              The title in a table in a table of contents is counted, but the
              table directory isn&apos;t.
            </li>
            <li>
              Links and Acroynms are counted separately (Same as Google Docs)
            </li>
            <li>
              Apple Pages doesn&apos;t count mathematical symbols at all, but it
              does count Greek letters as symbols
            </li>
          </ul>

          <p>
            Notably, Apple Pages is the only software which counts emoji as
            words, and not as a char.
            <br />
            <ul>
              <li>
                What this means is that 🥡🦪, 🐈‍⬛ is counted as 3 words with
                Apple pages and 2 words in other software.
              </li>
            </ul>
          </p>

          <h4>Notable Behaviours</h4>
          <ul>
            <li>Bullets/Numbers, Headers/Footers are not counted</li>
            <li>Equations are not counted</li>
            <li>Links and Acroynms are counted separately</li>
            <li>Emoji are counted as words</li>
            <li>Strange Table of Contents behaviour</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Now that this exercise is finished, I don&apos;t know quite what to
            feel about the results.
            <br />
            I don&apos;t know which software is the most correct, as ultimately
            many of the decision on what is or isn&apos;t a word is debatable.
            <br />
          </p>

          <p>
            Ironically, I discovered that this still hasn&apos;t fixed the issue
            with my original Uni assignment as they use Canvas&apos;s
            speedgrader, <br />
            which does not expose its wordcount to students.
          </p>

          <p>
            Ultimately, the best solution is to build in a margin of error into
            wordcount requirements
            <br />
            and to NEVER require a precise wordcount to be written inside the
            document.
          </p>

          <h3>Questions</h3>
          <p>
            If you have questions, feel free to send them to{" "}
            <a href="mailto:jchu634@keshuac.com">jchu634@keshuac.com</a>
          </p>

          <h2>Appendices</h2>

          <h3>AP 1.1: Benchmark Files</h3>
          <p>
            All of files used in the testing are freely and publicly available
            at{" "}
            <a href="https://github.com/jchu634/WordCountTesting">
              https://github.com/jchu634/WordCountTesting
            </a>
            <br />
            Feedback is very much welcome!
          </p>

          <h3>AP 1.2: Results Table:</h3>

          <h4>AP 1.2.1: .DOCX</h4>
          <Table>
            <TableCaption>.DOC Data</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                {tableHeaders.map((header, index) => {
                  return <TableHead key={index}>{header}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {docxData.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{data.software}</TableCell>
                    {data.results.map((result, index2) => {
                      return <TableCell key={index2}>{result}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <h4>AP 1.2.2: .DOC</h4>
          <Table>
            <TableCaption>.DOC Data</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                {tableHeaders.map((header, index) => {
                  return <TableHead key={index}>{header}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {docData.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{data.software}</TableCell>
                    {data.results.map((result, index2) => {
                      return <TableCell key={index2}>{result}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </article>
  );
}
