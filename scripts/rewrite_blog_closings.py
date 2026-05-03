# -*- coding: utf-8 -*-
"""Replace duplicate closing blocks in the 30 new blog posts with unique copy."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "blog")

START = ' <h2 class="text-xl font-semibold text-ink pt-4">How this fits The Freelancer Stack</h2>'
END = " </div>\n </article>"

CLOSINGS = {
    "figma-review-worth-it-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Figma on your desk</h2>
 <p>
 Figma is not a personality test. It is a collaboration surface that pays off when frames become contracts with engineering and when components stop you from rebuilding the same button twelve times. If your income does not pass through shipped UI, you can still keep Figma around as a sidecar, but do not pretend the subscription is oxygen.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would do before the next client</h2>
 <p>
 I would freeze one library version per client, write export rules on a single page, and rehearse how I hand off Dev Mode links without sounding defensive. I would also open <a href="/blog/canva-vs-figma-freelancers-use.html" class="text-accent hover:underline">Canva vs Figma</a> again any time a lead says they only need social graphics, because that sentence usually saves both of you money.
 </p>
""",
    "hostinger-review-cheap-hosting-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: cheap hosting without cheap surprises</h2>
 <p>
 Hostinger is a reasonable home for lean marketing sites when you accept that budget tiers trade concierge support for price. Your job is to keep backups, SSL renewals, and plugin discipline boring so uptime stays boring too. If the site carries revenue or sensitive intake forms, budget monitoring like a grown-up, not like a wish.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Before you click renew</h2>
 <p>
 I would export a static copy of the theme, write down DNS ownership, and read what the plan actually includes for staging and restores. Then I would read <a href="/blog/hosting-portfolio-freelancers-guide.html" class="text-accent hover:underline">how to choose hosting for a portfolio</a> next to this review so you are not deciding on price alone.
 </p>
""",
    "wave-accounting-review-free-option": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Wave when zero dollars tempts you</h2>
 <p>
 Wave stays honest as long as you treat free as a runway, not as a moral victory over paid tools. If receipts pile up uncategorized or clients pay late because reminders never fire, the cost moved from subscription line items into your calendar. Graduate when exports, payroll, or integrations start blocking real money.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Pair Wave with one hard rule</h2>
 <p>
 I would pick a monthly reconciliation day and keep categories consistent enough that a future bookkeeper can read the ledger without therapy. Read <a href="/blog/free-invoicing-hidden-cost.html" class="text-accent hover:underline">free invoicing hidden costs</a> next so you know what “free” often trades away.
 </p>
""",
    "honeybook-review-worth-it-creatives": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: HoneyBook for packaged creative work</h2>
 <p>
 HoneyBook earns its fee when proposals, contracts, and payments live in one lane your clients can follow without a tutorial. It wilts when every project is a bespoke negotiation that refuses templates. If your calendar is mostly repeatable packages with deposits, the math is friendlier than if you live inside enterprise procurement theater.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Before you import your whole life</h2>
 <p>
 I would map one ideal client journey in HoneyBook first, then automate only the steps that already happen reliably. Compare notes with <a href="/categories/invoicing-finance.html" class="text-accent hover:underline">invoicing and finance picks</a> if you need a nerdier stack beside it for taxes or time tracking.
 </p>
""",
    "surfshark-review-affordable-vpn-remote-work": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Surfshark on the road</h2>
 <p>
 Surfshark is easiest to defend when you actually join strange Wi-Fi weekly and you want multi-device coverage without building a spreadsheet of logins. It does not replace MFA, backups, or the habit of looking over your shoulder in coffee shops. Price is the headline, but behavior is the warranty.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Sanity check before you evangelize</h2>
 <p>
 I would run speed tests on the networks you hate most, confirm killswitch behavior on your OS, and read policy updates when ownership shifts. Then compare with <a href="/blog/nordvpn-vs-expressvpn-remote-work.html" class="text-accent hover:underline">NordVPN vs ExpressVPN</a> so you pick from a shortlist, not from vibes alone.
 </p>
""",
    "expressvpn-review-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: ExpressVPN when stability is the product</h2>
 <p>
 ExpressVPN is the line item you buy when dropped calls and flaky tunnels cost more than the annual price. It is harder to justify if you only need occasional café protection and you already carry a hotspot. Premium here is mostly polish, speed consistency, and fewer “why is this broken” afternoons.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Pair it with boring basics</h2>
 <p>
 I would still enforce disk encryption on laptops, keep VPN off on trusted home fiber unless you have a reason, and teach clients the same baseline habits you rely on. Read <a href="/blog/why-freelancers-need-vpn.html" class="text-accent hover:underline">why freelancers need a VPN</a> alongside this review so nobody mistakes encryption for invincibility.
 </p>
""",
    "jasper-ai-review-useful-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Jasper as a draft engine, not a verdict</h2>
 <p>
 Jasper pays off when you use it to widen headline options, outline dense pages, or break blank-page freeze on marketing chores. It backfires when you ship confident paragraphs you never fact checked or when client voice contracts forbid opaque generation. Disclosure belongs in scope, not in your head at 2 a.m.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would lock before subscribing</h2>
 <p>
 I would write a one-page internal policy: where AI is allowed, how outputs get edited, and how you store prompts that might contain client names. Compare with <a href="/tools/jasper.html" class="text-accent hover:underline">our Jasper tool page</a> if you want a tighter product snapshot next to this narrative review.
 </p>
""",
    "trello-review-still-relevant-2026": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Trello in a loud PM market</h2>
 <p>
 Trello still wins when your clients can read a board without training and when your own work fits cards more naturally than databases. It loses when you pretend it is a full data warehouse or a finance system. If your pain is visibility and rhythm, not resource leveling across fourteen teams, Trello can stay relevant without apology.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">When to graduate without shame</h2>
 <p>
 I would move on when dependencies, reporting, and cross-project views start eating hours you could bill elsewhere. Until then, read <a href="/blog/best-pm-tools-solo-freelancers.html" class="text-accent hover:underline">solo PM picks</a> so you know what heavier tools buy you before you drag clients through migration drama.
 </p>
""",
    "clickup-review-solo-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: ClickUp for one brain, many tabs</h2>
 <p>
 ClickUp rewards freelancers who treat setup like a contract with their future tired self: fewer views, fewer automations that email clients by accident, and a ruthless default home screen. Power without guardrails becomes a second job you do not invoice. The tool is not lazy. You might be, about configuration hygiene.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would simplify first</h2>
 <p>
 I would delete notification channels until only one inbox matters, then rebuild three templates: intake, delivery, closeout. Cross-check <a href="/tools/clickup.html" class="text-accent hover:underline">our ClickUp page</a> if you want a shorter comparison table beside this longer opinion.
 </p>
""",
    "webflow-review-worth-learning": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Webflow as a craft bet</h2>
 <p>
 Webflow is worth learning when you sell sites as a discipline and you can teach clients how not to break the CMS. It is a weaker bet when you only need a brochure that ships this weekend and never changes. Hosting and export realities belong in proposals early, not as a surprise footnote after launch week.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Teach clients the guardrails</h2>
 <p>
 I would record a short walkthrough of safe edits, lock fields that should not flex, and price retainers for the inevitable “small tweak” avalanche. Pair this review with <a href="/tools/webflow.html" class="text-accent hover:underline">our Webflow tool page</a> when you want specs and pricing in one glance.
 </p>
""",
    "best-vpn-freelancers-2026": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: a 2026 VPN shortlist that respects your week</h2>
 <p>
 The best VPN for freelancers is still the one you enable when risk spikes, paired with MFA and backups that do not depend on coffee shop optimism. Names like NordVPN, ExpressVPN, and Surfshark stay on shortlists for different balances of price, polish, and device count. None of them fix phishing with a logo.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">How I would test before recommending</h2>
 <p>
 I would run uploads on the worst network I use monthly, not on home fiber alone, and I would confirm killswitch behavior on the OS I actually ship from. Browse <a href="/categories/vpn-security.html" class="text-accent hover:underline">VPN and security picks</a> after this so recommendations stay grounded in products we track, not in one-off affiliate moods.
 </p>
""",
    "free-vs-paid-project-management-tools": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: free versus paid PM is a calendar question</h2>
 <p>
 Free tools win when your pipeline is thin and your clients tolerate simple boards. Paid tools win when permissions, audit trails, and integrations stop you from duct-taping five apps every Friday. The cost you should fear is not the subscription line item. It is the hour you lose reconstructing decisions from chat archaeology.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">Pick with one migration rule</h2>
 <p>
 I would choose the tier I expect to need in ninety days, not the tier that flatters my budget today, because mid-project migrations tax clients even when you eat the hours. Re-read <a href="/blog/notion-worth-it-freelancers.html" class="text-accent hover:underline">Notion worth it</a> if you live in the mushy middle between docs and delivery.
 </p>
""",
    "how-to-price-freelance-services": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: pricing is a boundary, not a vibe</h2>
 <p>
 Your rate should survive a quiet month and still feel fair when work stacks. That means building floor, target, and stretch numbers from real costs and real risk, then practicing the sound of the target out loud until your voice stops apologizing. Clients respect numbers that come with scope, not numbers that come with trembling.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would document this week</h2>
 <p>
 I would write three scope templates that match how I actually deliver, then attach payment triggers that match how clients actually pay. After that, read <a href="/blog/invoice-faster-freelancers.html" class="text-accent hover:underline">how to send invoices that get paid faster</a> so the number you quote turns into cash without a guilt spiral.
 </p>
""",
    "best-tools-freelance-designers-2026": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: a designer stack that ships, not cosplays</h2>
 <p>
 Designers still sell taste, but freelancers ship files, approvals, and invoices. Your 2026 stack should make handoffs legible to non-designers and make receipts legible to future you. Figma, asset hygiene, and a boring finance layer beat a wall of logos nobody can click through on a phone.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would audit quarterly</h2>
 <p>
 I would check font licenses, export presets, and client comment surfaces so feedback stops living in screenshots in Slack. Start from <a href="/categories/design-tools.html" class="text-accent hover:underline">design tools picks</a> when you want comparisons that match how solo studios actually work.
 </p>
""",
    "best-tools-freelance-writers-2026": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: writers still sell sentences and receipts</h2>
 <p>
 Writing tools matter, but backups, version history, and invoicing matter when a client forwards your email to their boss. Build a stack that protects the byline and the bank account. AI drafting can sit in the stack only if your contracts and ethics say where it is allowed, not only when it is convenient.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would schedule monthly</h2>
 <p>
 I would update samples, prune dead subscriptions, and reconcile time if I sell retainers. Jump to <a href="/categories/writing-tools.html" class="text-accent hover:underline">writing tools picks</a> when you want product pages beside these workflow notes.
 </p>
""",
    "how-to-get-clients-new-freelancer": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: clients come from loops, not lightning</h2>
 <p>
 New freelancers fail acquisition by quitting outreach before the sample size means anything. Warm intros, specific cold emails, and proof that shows outcomes beat motivational posters. Track replies, meetings, and proposals like a product funnel so you know which message to kill and which to double down on.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would ship this week</h2>
 <p>
 I would publish one case-shaped sample, ask five people for introductions, and send ten non-spammy notes that cite a real page or problem. Then tighten <a href="/blog/better-client-proposals-freelance.html" class="text-accent hover:underline">proposals</a> so the first yes does not turn into scope soup.
 </p>
""",
    "how-to-set-freelance-rate": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: your rate is a promise about risk</h2>
 <p>
 Setting a rate is not astrology. It is math plus posture: what you need to survive, what the market tolerates, and what rush or ambiguity should cost extra. If you cannot say the number calmly, clients hear uncertainty and negotiate against it, often without malice, just habit.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would revisit quarterly</h2>
 <p>
 I would compare booked hours to quoted hours, then raise or narrow scope before resentment becomes your brand voice. Pair this with <a href="/blog/how-to-price-freelance-services.html" class="text-accent hover:underline">how to price services</a> if you still need anchors before you touch retainers.
 </p>
""",
    "best-contract-tools-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: contract tools only carry what you write</h2>
 <p>
 E-sign platforms make signing fast, but they do not write scope for you. The win is versioned PDFs, readable audit trails, and filenames that do not look like final_final_v9. Pick a tool your least technical signer can open on a phone without IT tickets, then marry it to templates a lawyer has seen for your niche.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would template next</h2>
 <p>
 I would add explicit revision counts, payment triggers, and pause language before I add more integrations. Read <a href="/blog/how-to-write-freelance-contract.html" class="text-accent hover:underline">how to write a freelance contract</a> so the software wraps around clauses that survive contact with reality.
 </p>
""",
    "follow-up-unpaid-invoices-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: unpaid invoices are a process problem</h2>
 <p>
 Follow-up works when invoices include clear due dates, payment links, and terms you already showed in the proposal. Tone ladders help you stay firm without inventing new personality disorders per client. Late fees exist to train behavior, not to fund revenge fantasies, so state them early and apply them calmly.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would automate today</h2>
 <p>
 I would turn on reminders in whatever invoicing tool I use, attach the same three email templates, and log every promise a client makes about payment dates. Compare <a href="/categories/invoicing-finance.html" class="text-accent hover:underline">invoicing tools</a> when your free setup starts leaking time.
 </p>
""",
    "best-time-tracking-tools-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: time data is only useful if you read it</h2>
 <p>
 Time tracking turns guesses into estimates and retainers into math instead of hope. Pick a tool you will actually start on ugly days, with exports your accountant tolerates. If you never review weekly totals, you bought a dashboard, not a habit.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would do with the numbers</h2>
 <p>
 I would mark which clients consume disproportionate hours, then change pricing or packaging before bitterness shows up in tone. Cross-read <a href="/blog/professional-freelance-workflow-setup.html" class="text-accent hover:underline">professional workflow setup</a> so timers feed a wider system, not a guilt ornament.
 </p>
""",
    "notion-vs-clickup-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Notion versus ClickUp is a habits question</h2>
 <p>
 Notion wins when your deliverable is knowledge, specs, and readable hubs. ClickUp wins when dates, owners, and dependencies refuse to live inside paragraphs. Hybrid stacks are fine if you name which system owns truth for tasks versus docs, otherwise you duplicate reality and blame software.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would prototype in a day</h2>
 <p>
 I would build one client journey in each tool with the same scope, then pick whichever your client can navigate without a Zoom tour. Keep <a href="/blog/picking-project-management-freelancer.html" class="text-accent hover:underline">how to pick PM software</a> open while you score the test.
 </p>
""",
    "grammarly-review-worth-price": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: Grammarly Premium is a reputation line item</h2>
 <p>
 Premium pays off when client-facing email and proposals carry real money and small tone slips would sting. It frustrates when you accept every suggestion and sound like a brochure. Treat it like an editor with opinions: keep the catches, reject the flattening.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would compare before renewing</h2>
 <p>
 I would re-read <a href="/blog/grammarly-vs-hemingway-paying.html" class="text-accent hover:underline">Grammarly vs Hemingway</a> and the <a href="/tools/grammarly.html" class="text-accent hover:underline">Grammarly tool page</a> so the renewal decision references your actual workload, not a popup guilt timer.
 </p>
""",
    "freshbooks-review-best-invoicing-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: FreshBooks when invoices should look grown up</h2>
 <p>
 FreshBooks shines when proposals flow into invoices, reminders stay polite, and expenses stop living in shoeboxes. It is not a full enterprise ERP. If you outgrow it, graduate without shame, but do not underestimate how much calm UX buys you with skittish clients.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would tighten this month</h2>
 <p>
 I would reconcile categories, attach payment links to every recurring profile, and export a backup before tax season panic. Read <a href="/blog/best-invoicing-software-freelancers-2026.html" class="text-accent hover:underline">best invoicing software in 2026</a> when you want side-by-side alternatives.
 </p>
""",
    "nordvpn-review-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: NordVPN as a travel habit, not a tattoo</h2>
 <p>
 NordVPN is useful when unfamiliar networks are a normal Tuesday and you want consumer-grade simplicity across devices. Read policy updates when ownership shifts, and pair the app with disk encryption and MFA so marketing never oversells what encryption actually fixes.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would test on my worst network</h2>
 <p>
 I would run uploads, reconnect after sleep, and confirm killswitch behavior on my actual laptop stack. Then open <a href="/tools/nordvpn.html" class="text-accent hover:underline">our NordVPN page</a> and <a href="/blog/nordvpn-vs-expressvpn-remote-work.html" class="text-accent hover:underline">Nord vs ExpressVPN</a> before you preach a brand to clients.
 </p>
""",
    "best-tools-freelance-developers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: developer freelancing needs boring rails</h2>
 <p>
 Clients forgive stack choices they do not understand. They do not forgive surprise invoices, missing tickets, or secrets in git history. Your tools should make scope, deploys, and handoffs legible to humans who do not live in your terminal.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would harden first</h2>
 <p>
 I would wire secrets management, CI on staging, and a single client-visible board for decisions. Browse <a href="/categories/project-management.html" class="text-accent hover:underline">project management picks</a> when tickets start leaking back into email where they die quietly.
 </p>
""",
    "build-freelance-portfolio-site": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: portfolios sell proof, not passion essays</h2>
 <p>
 A portfolio site should answer what you do, who it is for, and how to start a conversation before the visitor scrolls into a novel about your childhood. Case studies with metrics beat logo walls. Fast pages on mobile beat clever animations that stutter on hotel Wi-Fi.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would ship before the next pitch</h2>
 <p>
 I would add one new case study, compress hero images, and test the contact form from a phone on LTE. Read <a href="/blog/hosting-portfolio-freelancers-guide.html" class="text-accent hover:underline">hosting your portfolio</a> when you are ready to pick infrastructure that matches your comfort level.
 </p>
""",
    "best-password-managers-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: password managers buy cheap peace</h2>
 <p>
 A manager is the fastest way to stop reusing passwords across client systems without pretending you will memorize twenty random strings. Sharing rules still need contracts: who may access which vault folder, and when access gets revoked after a project ends.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would configure tonight</h2>
 <p>
 I would enable breach alerts, store backup codes inside the vault, and separate personal logins from client-related ones. Then read <a href="/blog/freelancer-staying-secure-online-guide.html" class="text-accent hover:underline">staying secure online</a> so passwords sit inside a wider baseline, not alone.
 </p>
""",
    "avoid-scope-creep-clients": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: scope creep dies on paper, not in vibes</h2>
 <p>
 Creep usually starts as a polite small ask that forgets earlier agreements. Written scope, change orders, and recap emails after calls are the unglamorous antibodies. If you train clients to expect free shape-shifting, you trained yourself into unpaid labor.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would send after every call</h2>
 <p>
 I would send three bullets: decisions, owners, dates. Pair that habit with <a href="/blog/better-client-proposals-freelance.html" class="text-accent hover:underline">better proposals</a> so the first yes already names what is not included.
 </p>
""",
    "best-screen-recording-tools-freelancers": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: screen recordings replace meetings when visuals matter</h2>
 <p>
 Recordings win when links play without accounts, audio is intelligible, and filenames say what the clip proves. They lose when you ramble for twelve minutes because planning felt optional. Treat async video like a spec: short, labeled, and tied to a decision you need.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would standardize</h2>
 <p>
 I would pick one tool for QA repros, one for client walkthroughs, and delete the rest from muscle memory. Read <a href="/blog/manage-client-communication-professionally.html" class="text-accent hover:underline">client communication</a> so recordings land where people actually look.
 </p>
""",
    "how-to-write-freelance-contract": """ <h2 class="text-xl font-semibold text-ink pt-4">Closing take: contracts turn memory into something billable</h2>
 <p>
 A good freelance contract names parties, scope, money, IP shift timing, and what happens when feedback is late or someone vanishes. Readable beats clever. If a client cannot understand it without counsel, you might still be fine, but you should expect slower signatures.
 </p>
 <h2 class="text-xl font-semibold text-ink pt-4">What I would store the day it signs</h2>
 <p>
 I would save executed PDFs in two places, note renewal or kill dates on my calendar, and align invoice triggers with the same milestones. Pair with <a href="/blog/best-contract-tools-freelancers.html" class="text-accent hover:underline">contract tools</a> when you are ready to pick signing software that matches your volume.
 </p>
""",
}


def fix_file(slug: str):
    path = os.path.join(BLOG, slug + ".html")
    html = open(path, encoding="utf-8").read()
    if START not in html:
        print("skip (no marker)", slug)
        return
    before, rest = html.split(START, 1)
    if END not in rest:
        raise ValueError(f"bad file {slug}")
    _old, tail = rest.split(END, 1)
    new_html = before + CLOSINGS[slug].rstrip() + "\n" + END + tail
    open(path, "w", encoding="utf-8", newline="\n").write(new_html)
    print("fixed", slug)


def main():
    for slug in CLOSINGS:
        fix_file(slug)


if __name__ == "__main__":
    main()
