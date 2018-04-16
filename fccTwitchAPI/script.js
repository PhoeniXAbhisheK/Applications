const channels = ["ESL_SC2", "OgamingSC2", "riotgames", "freecodecamp", "ninja", "tsm_myth", "programming", "drdisrespect_daybreak", "eleaguetv"];
const menuItems = document.querySelector('.menu-items');
menuItems.innerHTML = "";


function makeItem(isLive, url, channel, name, game, status) {
  return `<div class="item ${isLive} col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                  <a href="${url}"><p class="item-img ${channel}"></p></a>
                                  <p class="item-text">${name}</p>
                                  <p class="item-text">${game}</p>
                                  <p class="item-text">${status}</p>
                              </div>`;
}

function getStatus(status) {
  if (status)
    status = status.substr(0, 30).concat('...');
  else
    status = "-";
  return status;
}
channels.forEach(channel => {
  $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${channel}?callback=?`, function(data) {
    if (data.stream) {
      // console.log(data);
      menuItems.innerHTML += makeItem("live", data.stream.channel.url, channel, data.stream.channel.display_name, data.stream.channel.game, getStatus(data.stream.channel.status));
      document.querySelector(`.${channel}`).style.backgroundImage = `url(${data.stream.channel.logo})`;
      document.querySelector(`.${channel}`).style.backgroundSize = `cover`;
    } else if (data.stream == null) {
      $.getJSON(`https://wind-bow.gomix.me/twitch-api/channels/${channel}?callback=?`, function(data) {
        // console.log(data);
        menuItems.innerHTML += makeItem("offline", data.url, channel, data.display_name, "Offline", getStatus(data.status));
        document.querySelector(`.${channel}`).style.backgroundImage = `url(${data.logo})`;
        document.querySelector(`.${channel}`).style.backgroundSize = `cover`;
      });
    }
  });
});