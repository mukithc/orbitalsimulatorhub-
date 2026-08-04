import { Link } from "wouter";
import { getRecentPosts } from "../data/blogPosts";

/**
 * Space news landing page — targets "space news" keyword.
 * Daily content from blog; Google loves fresh pages.
 */
export function SpaceNews() {
  const recent = getRecentPosts(15);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Blog & News</p>
        <h1 className="headline">Space News – Daily Missions &amp; Astronomy</h1>
        <p className="subhead max-w-2xl">
          Latest space news: Artemis, Mars rovers, James Webb, SpaceX, ISS, and astronomy. Updated daily. Read space news for students, teachers, and space fans.
        </p>
      </div>

      <div className="rounded-xl border-2 p-4" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <p className="font-medium" style={{ color: "var(--text-primary)" }}>📡 Fresh space news every day.</p>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>We publish space mission news, satellite tutorials, space facts, and astronomy lessons. Bookmark this page or follow our <Link href="/rss.xml"><a className="text-[var(--accent-cyan)] hover:underline">RSS feed</a></Link> for daily updates.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Latest space news &amp; articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block p-5 rounded-xl border-2 transition hover:shadow-lg hover:scale-[1.01]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>{post.category.replace("-", " ")}</span>
                <h3 className="font-bold mt-1 mb-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/blog">
          <a className="px-5 py-2.5 rounded-xl font-semibold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>All articles →</a>
        </Link>
        <Link href="/blog/category/nasa-news">
          <a className="px-5 py-2.5 rounded-xl border-2 font-medium" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space mission news</a>
        </Link>
        <Link href="/missions/timeline">
          <a className="px-5 py-2.5 rounded-xl border-2 font-medium" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>Mission timeline</a>
        </Link>
      </div>
    </div>
  );
}
