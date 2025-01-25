import { TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "next-share"


type metric = {
    user_score: number,
    cpm_score: number,
    wpm_score: number
}

function RemarkCard({ user_score, cpm_score, wpm_score }: metric) {
    let remarks = ""
    let advice = ""
    let img_link = ""

    const shareUrl = `https://typeflash.netlify.app/\n`;
    let twitterMessage = ``;

    function Reload() {
        window.location.reload()  // reloads the page
    }

    if (user_score <= 20) {
        remarks = "You're A Tortoise"
        advice = "May be this is your first time or may be you should practice a little more!"
        img_link = "https://lcdn-in.icons8.com/c/5P9UQucmA0aHIlVmuzKc8g/b6a29804d8c9dfbfe1240abce4a2d8ec91aaa923.webp"
        twitterMessage = `Imma tortoise when it comes to the keyboard :) \n\nFind out your KEYBOARD ANIMAL in TypeFlash\n\n`
    }
    else if (user_score <= 40) {
        remarks = "You're A Panda"
        advice = "A little more focus and consistency will boost your speed!"
        img_link = "https://lcdn-in.icons8.com/c/5P9UQucmA0aHIlVmuzKc8g/50565c50f21deaae84d3a89652ba4445ec3b7b18.webp"
        twitterMessage = `Imma Panda when it comes to the keyboard :) \n\nFind out your KEYBOARD ANIMAL in TypeFlash\n\n`
    }
    else if (user_score <= 80) {
        remarks = "Dayumm! You're An Eagle"
        advice = "Just a few more practice sessions and you'll be blazing through documents!"
        img_link = "https://lcdn-in.icons8.com/c/5P9UQucmA0aHIlVmuzKc8g/cab89faef4086a3dd981a320dc114a027a4b551c.webp"
        twitterMessage = `Imma freakin Eagle when it comes to the keyboard :) \n\nFind out your KEYBOARD ANIMAL in TypeFlash\n\n`
    }
    else if (user_score <= 100 || user_score >= 100) {
        remarks = "You're A Freaking Cheetah"
        advice = "You're not just typing; you're creating digital art at lightning speed!"
        img_link = "https://lcdn-in.icons8.com/c/5P9UQucmA0aHIlVmuzKc8g/88793d23a0fdb1eafe4967e406195e211bcd6374.webp"
        twitterMessage = `Dayum! TypeFlash thinks I AM HIM, I'm the fastest animal on keyboard :) \n\nFind out your KEYBOARD ANIMAL in TypeFlash\n\n`
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="bg-[#1F1F1F] flex flex-col gap-10 p-8 rounded-lg border-[0.05em]">
                <div className="flex justify-around items-start">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-white text-3xl max-w-[14ch] leading-none">{remarks}</h1>
                        <p className="text-gray-400 max-w-[30ch] leading-none">{advice}</p>
                    </div>
                    <div>
                        {/* <p className="text-white">image</p> */}
                        <img className="max-w-14" src={img_link} alt="" />
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                        <div className="leading-none">
                            <h1 className="text-white text-3xl">CPM</h1>
                            <p className="text-gray-400">Characters Person Minute</p>
                        </div>
                        <div>
                            <h1 className="text-white text-3xl">
                                {cpm_score}
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="leading-none">
                            <h1 className="text-white text-3xl">WPM</h1>
                            <p className="text-gray-400">Words Per Minute</p>
                        </div>
                        <div>
                            <h1 className="text-white text-3xl">
                                {wpm_score}
                            </h1>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="leading-none">
                            <h1 className="text-white text-3xl">Score</h1>
                            <p className="text-gray-400">Number Of Correct Words</p>
                        </div>
                        <div>
                            <h1 className="text-white text-3xl">
                                {user_score}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <button className="text-gray-950 font-bold bg-gray-50 py-2 px-4 rounded-full"
                        onClick={Reload}
                    >
                        Try Again?
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-6 justify-center items-center">
                <div className="flex flex-col items-center">
                    <h1 className="max-w-[25ch] text-center text-gray-300">
                        Share it and let other find their Keyboar Animal
                    </h1>
                </div>
                <div className="flex flex-wrap gap-10">
                    <TwitterShareButton
                        url={shareUrl}
                        hashtags={[`keyboardAnimaldibya`, `typeFlash`]}
                        title={twitterMessage}
                        children={
                            <TwitterIcon size={40} round />
                        }
                        via="dibyacodes"
                        blankTarget={true}
                    />

                    <WhatsappShareButton
                        url={shareUrl}
                        title={twitterMessage}
                        children={
                            <WhatsappIcon size={40} round />
                        }
                        blankTarget={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default RemarkCard