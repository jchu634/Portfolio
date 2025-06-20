import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";

export const metadata: Metadata = {
  title: "Misc: Grenadine Recipe",
  date: "2024-08-20",
  description: "A recipe for a rich grenadine syrup",
  lastUpdate: "2024-08-20",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <h4>Introduction</h4>
        <p>
          I wrote this otherwise I would forget it, this is just a recipe for
          some grenadine.
        </p>
        <h4>Ingredients</h4>
        <ul>
          <li>1 Volume of Pomegranate Juice</li>
          <li>2 Volumes of Sugar</li>
          <li>Pomegranate molasses (optional)</li>
          <li>Orange blossom water (optional)</li>
        </ul>
        <h4>Instructions</h4>
        <ol start={1}>
          <li>Add the pomegranate juice and sugar to a saucepan</li>
          <li>
            Heat on medium heat until the sugar is dissolved (mix as you go)
          </li>
          <li>
            Once the sugar is dissolved, add the pomegranate molasses (Roughly a
            soup spoon per litre of juice)
          </li>
          <li>
            Heat until low boil, then leave for a minute (This is for germ
            killing, though I have no idea if it is actually needed)
          </li>
          <li>
            Add a couple splashes of orange blossom water 6. Let cool, then
            bottle.
          </li>
        </ol>
        <h4>Notes</h4>
        <p>
          Since this is a rich syrup (2:1 Sugar to water), it should be shelf
          stable for who knows how long.
        </p>
        <p>
          The yield of the syrup is roughly equal to the amount of sugar. e.g. 2
          cups sugar, 1 cup juice = 2 cups syrup.
        </p>
      </div>
    </article>
  );
}
