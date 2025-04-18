import Image from "next/image";
import styles from "./page.module.css";
import {AutoStore, reflection, useStoreAsync} from "reca";
import {JSX} from "react";

@reflection
class TStore extends AutoStore {

    public prop = 0;

    // eslint-disable-next-line class-methods-use-this
    public async testAsync (): Promise<number> {
        return await Promise.resolve(5);
    }

}

// eslint-disable-next-line max-lines-per-function
const Home = async (): Promise<JSX.Element> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = await useStoreAsync(TStore);

    const num = await store.testAsync();
    // eslint-disable-next-line no-console
    console.log("111111111111", store.prop, num);
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Get started by editing
                    {" "}

                    <code className={styles.code}>
                        app/page.tsx
                    </code>
                </p>

                <div>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        By
                        {" "}

                        <Image
                            alt="Vercel Logo"
                            className={styles.vercelLogo}
                            height={24}
                            priority
                            src="/vercel.svg"
                            width={100}
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>
                <Image
                    alt="Next.js Logo"
                    className={styles.logo}
                    height={37}
                    priority
                    src="/next.svg"
                    width={180}
                />
            </div>

            <div className={styles.grid}>
                <a
                    className={styles.card}
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <h2>
                        Docs
                        {" "}

                        <span>
                            -&gt;
                        </span>
                    </h2>

                    <p>
                        Find in-depth information about Next.js features and API.
                    </p>
                </a>

                <a
                    className={styles.card}
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <h2>
                        Learn
                        {" "}

                        <span>
                            -&gt;
                        </span>
                    </h2>

                    <p>
                        Learn about Next.js in an interactive course with&nbsp;quizzes!
                    </p>
                </a>

                <a
                    className={styles.card}
                    href="https://vercel.com/templates"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <h2>
                        Templates
                        {" "}

                        <span>
                            -&gt;
                        </span>
                    </h2>

                    <p>
                        Explore starter templates for Next.js.
                    </p>
                </a>

                <a
                    className={styles.card}
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <h2>
                        Deploy
                        {" "}

                        <span>
                            -&gt;
                        </span>
                    </h2>

                    <p>
                        Instantly deploy your Next.js site to a shareable URL with Vercel.
                    </p>
                </a>
            </div>
        </main>
    );
};

export default Home;
