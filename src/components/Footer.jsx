import { HeaderIcon } from "./Icons";

export function Footer() {
    return (
        <section className="dark:bg-slate-800 flex justify-between items-center px-20 py-8">
            <div className="flex items-center justify-center gap-3 font-bold">
                <HeaderIcon width="24" height="24" />
                <h1>PRzone</h1>
            </div>

            <p className="text-sm text-gray-500 font-semibold">©2025 PRzone. All rigths reserved</p>
        </section>
    )
}