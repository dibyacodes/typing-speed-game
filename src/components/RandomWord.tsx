type random = {
    randomWord: string
}


function RandomWord({ randomWord }: random) {
    return (
        <>
            <h1>
                {randomWord}
            </h1>
        </>
    )
}

export default RandomWord