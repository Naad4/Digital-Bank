function dataHoraFormatada() {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo",
    };

    const formattedDate = new Date()
        .toLocaleString("pt-BR", options)
        .split(",")
        .join("");

    let [data, hora] = formattedDate.split(" ");

    data = data.split("/").reverse().join("-");
    return `${data} ${hora}`;
}

module.exports = { dataHoraFormatada };

