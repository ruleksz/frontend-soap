export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <p className="text-sm">
                © {new Date().getFullYear()} MyPortfolio. All rights reserved.
            </p>
        </footer>
    );
}
