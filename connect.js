module.exports.verifyUserRoom = function (peerConnection, ui, cb) {
  peerConnection.getRemoteConfig(function (err, config) {
    if (err) return cb(err)
    ui.inputs.paste.value = ''

    // first, wait for user to enter room name
    ui.buttons.paste.addEventListener('click', onJoinClick)

    function onJoinClick (ev) {
      ev.preventDefault()
      var room = ui.inputs.paste.value
      ui.inputs.paste.value = 'Connecting...'
      if (!room) return
      peerConnection.verifyRoom(room, function (err) {
        cb(err, room, config)
      })
    }
  })
}

module.exports.remote = function (peerConnection, ui, config, room) {
  peerConnection.remotePeer(config, room, function (err, peer) {
    if (err) {
      ui.inputs.paste.value = 'Error! ' + err.message
      return
    }

    if (!room) {
      ui.inputs.paste.value = 'Error! Please Quit'
      return
    }

    peer.on('stream', function (stream) { renderStreams(peerConnection, ui, stream) })

    peer.on('signal', function (sdp) {
      console.log('网页handleSignal')
      sdp = {"type":"offer","sdp":"v=0\r\no=- 2781831783012317114 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE audio video data\r\na=msid-semantic: WMS YqExSGoZf0aUKZlae4QhxyP00NPS8MF9dgAQ ivOnnnhayNjGDbblLapYY8m6xPyeSHV4zUg3\r\nm=audio 50963 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\nc=IN IP4 192.168.239.193\r\na=rtcp:50965 IN IP4 192.168.239.193\r\na=candidate:1322914085 1 udp 2122260223 192.168.239.193 50963 typ host generation 0\r\na=candidate:2146410913 1 udp 2122194687 10.226.2.14 50964 typ host generation 0\r\na=candidate:1322914085 2 udp 2122260222 192.168.239.193 50965 typ host generation 0\r\na=candidate:2146410913 2 udp 2122194686 10.226.2.14 50966 typ host generation 0\r\na=candidate:5893589 1 tcp 1518280447 192.168.239.193 0 typ host tcptype active generation 0\r\na=candidate:829185361 1 tcp 1518214911 10.226.2.14 0 typ host tcptype active generation 0\r\na=candidate:5893589 2 tcp 1518280446 192.168.239.193 0 typ host tcptype active generation 0\r\na=candidate:829185361 2 tcp 1518214910 10.226.2.14 0 typ host tcptype active generation 0\r\na=ice-ufrag:cS6bKQJVauNVESYY\r\na=ice-pwd:KBfrlqiL9WenfalpMi5vhn4j\r\na=fingerprint:sha-256 48:8F:E8:36:19:3D:BE:67:49:A7:2B:92:8A:0D:CA:C6:66:98:92:57:66:68:F3:36:FC:51:21:E3:E8:69:B9:BE\r\na=setup:actpass\r\na=mid:audio\r\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\na=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=sendrecv\r\na=rtcp-mux\r\na=rtpmap:111 opus/48000/2\r\na=fmtp:111 minptime=10; useinbandfec=1\r\na=rtpmap:103 ISAC/16000\r\na=rtpmap:104 ISAC/32000\r\na=rtpmap:9 G722/8000\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:106 CN/32000\r\na=rtpmap:105 CN/16000\r\na=rtpmap:13 CN/8000\r\na=rtpmap:126 telephone-event/8000\r\na=maxptime:60\r\na=ssrc:3707906607 cname:pfbps36tnGGyhsw4\r\na=ssrc:3707906607 msid:YqExSGoZf0aUKZlae4QhxyP00NPS8MF9dgAQ 2c2e5056-b07a-4653-a982-df22d3acb89f\r\na=ssrc:3707906607 mslabel:YqExSGoZf0aUKZlae4QhxyP00NPS8MF9dgAQ\r\na=ssrc:3707906607 label:2c2e5056-b07a-4653-a982-df22d3acb89f\r\nm=video 50969 UDP/TLS/RTP/SAVPF 100 116 117 96\r\nc=IN IP4 192.168.239.193\r\na=rtcp:50971 IN IP4 192.168.239.193\r\na=candidate:1322914085 1 udp 2122260223 192.168.239.193 50969 typ host generation 0\r\na=candidate:2146410913 1 udp 2122194687 10.226.2.14 50970 typ host generation 0\r\na=candidate:1322914085 2 udp 2122260222 192.168.239.193 50971 typ host generation 0\r\na=candidate:2146410913 2 udp 2122194686 10.226.2.14 50972 typ host generation 0\r\na=candidate:5893589 1 tcp 1518280447 192.168.239.193 0 typ host tcptype active generation 0\r\na=candidate:829185361 1 tcp 1518214911 10.226.2.14 0 typ host tcptype active generation 0\r\na=candidate:5893589 2 tcp 1518280446 192.168.239.193 0 typ host tcptype active generation 0\r\na=candidate:829185361 2 tcp 1518214910 10.226.2.14 0 typ host tcptype active generation 0\r\na=ice-ufrag:cS6bKQJVauNVESYY\r\na=ice-pwd:KBfrlqiL9WenfalpMi5vhn4j\r\na=fingerprint:sha-256 48:8F:E8:36:19:3D:BE:67:49:A7:2B:92:8A:0D:CA:C6:66:98:92:57:66:68:F3:36:FC:51:21:E3:E8:69:B9:BE\r\na=setup:actpass\r\na=mid:video\r\na=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:4 urn:3gpp:video-orientation\r\na=sendrecv\r\na=rtcp-mux\r\na=rtpmap:100 VP8/90000\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 nack pli\r\na=rtcp-fb:100 goog-remb\r\na=rtpmap:116 red/90000\r\na=rtpmap:117 ulpfec/90000\r\na=rtpmap:96 rtx/90000\r\na=fmtp:96 apt=100\r\na=ssrc-group:FID 1665917144 3398702054\r\na=ssrc:1665917144 cname:RWkKR5VQtIdwGHdV\r\na=ssrc:1665917144 msid:ivOnnnhayNjGDbblLapYY8m6xPyeSHV4zUg3 da5f4ab3-a46e-4c69-9efa-4aad6d7ba8ae\r\na=ssrc:1665917144 mslabel:ivOnnnhayNjGDbblLapYY8m6xPyeSHV4zUg3\r\na=ssrc:1665917144 label:da5f4ab3-a46e-4c69-9efa-4aad6d7ba8ae\r\na=ssrc:3398702054 cname:RWkKR5VQtIdwGHdV\r\na=ssrc:3398702054 msid:ivOnnnhayNjGDbblLapYY8m6xPyeSHV4zUg3 da5f4ab3-a46e-4c69-9efa-4aad6d7ba8ae\r\na=ssrc:3398702054 mslabel:ivOnnnhayNjGDbblLapYY8m6xPyeSHV4zUg3\r\na=ssrc:3398702054 label:da5f4ab3-a46e-4c69-9efa-4aad6d7ba8ae\r\nm=application 50967 DTLS/SCTP 5000\r\nc=IN IP4 192.168.239.193\r\na=candidate:1322914085 1 udp 2122260223 192.168.239.193 50967 typ host generation 0\r\na=candidate:2146410913 1 udp 2122194687 10.226.2.14 50968 typ host generation 0\r\na=candidate:5893589 1 tcp 1518280447 192.168.239.193 0 typ host tcptype active generation 0\r\na=candidate:829185361 1 tcp 1518214911 10.226.2.14 0 typ host tcptype active generation 0\r\na=ice-ufrag:cS6bKQJVauNVESYY\r\na=ice-pwd:KBfrlqiL9WenfalpMi5vhn4j\r\na=fingerprint:sha-256 48:8F:E8:36:19:3D:BE:67:49:A7:2B:92:8A:0D:CA:C6:66:98:92:57:66:68:F3:36:FC:51:21:E3:E8:69:B9:BE\r\na=setup:actpass\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\n"}
      peerConnection.handleSignal(sdp, peer, true, room, function (err) {
        if (err) {
          ui.containers.content.innerHTML = 'Error! Please Quit. ' + err.message
          return
        }
        console.log('SDP POST DONE')
      })
    })

    if (peer.connected) peerConnection.onConnect(peer, true)
    else peer.on('connect', function () { peerConnection.onConnect(peer, true) })
  })
}

module.exports.host = function (peerConnection, ui, opts) {
  if (!opts) opts = {}
  getARoom(peerConnection, ui, function (err, room, config) {
    if (err) {
      ui.inputs.copy.value = 'Error! ' + err.message
      return
    }
    ui.inputs.copy.value = room
    opts.room = room
    opts.config = config
    peerConnection.hostPeer(opts, function (err, peer) {
      if (err) {
        ui.inputs.copy.value = 'Error! ' + err.message
        return
      }

      if (!room) {
        ui.inputs.copy.value = 'Error! Please Quit'
        return
      }

      peer.on('stream', function (stream) { renderStreams(peerConnection, ui, stream) })

      peer.on('signal', function (sdp) {
        console.log('本地handleSignal')
        peerConnection.handleSignal(sdp, peer, false, room, function (err) {
          if (err) {
            ui.containers.content.innerHTML = 'Error! Please Quit. ' + err.message
            return
          }
        })
      })

      if (peer.connected) peerConnection.onConnect(peer, false)
      else peer.on('connect', function () { peerConnection.onConnect(peer, false) })
    })
  })
}

function renderStreams (peerConnection, ui, stream) {
  stream.getAudioTracks().forEach(function each (track) {
    var audio = peerConnection.audioElement(stream)
    ui.containers.multimedia.appendChild(audio)
    ui.hide(ui.containers.multimedia)
  })
  stream.getVideoTracks().forEach(function each (track) {
    var video = peerConnection.videoElement(stream)
    ui.containers.multimedia.appendChild(video)
    ui.hide(ui.containers.multimedia)
  })
}

function getARoom (peerConnection, ui, cb) {
  peerConnection.getRemoteConfig(function (err, config) {
    if (err) return cb(err)
    peerConnection.createRoom(function (err, room) {
      cb(err, room, config)
    })
  })
}
