const mutateConvo = (to, from, req, other) => {
  const toConvo = to?.conversations.find((convo) =>
    other ? convo.convoId === other : convo.convoId === from.userId
  );
  const fromConvo = from?.conversations.find((convo) =>
    other ? convo.convoId === other : convo.convoId === to.userId
  );

  if (toConvo) {
    const newConvoArray = to.conversations.filter(
      (obj) => obj.convoId !== toConvo.convoId
    );
    toConvo.received.push({
      userId: from.userId,
      content: req.body.content,
      date: req.body.date,
    });
    to.conversations = [...newConvoArray, toConvo];
  } else {
    to.conversations.push({
      convoId: other ? other : from.userId,
      sent: [],
      received: [
        {
          userId: from.userId,
          content: req.body.content,
          date: req.body.date,
        },
      ],
    });
  }
  if (other) {
    if (fromConvo) void 0;
    else {
      from.conversations.push({
        convoId: other ? other : to.userId,
        sent: [{ content: req.body.content, date: req.body.date }],
        received: [],
      });
    }
  } else {
    if (fromConvo) {
      const newConvoArray = from.conversations.filter(
        (obj) => obj.convoId !== fromConvo.convoId
      );
      fromConvo.sent.push({ content: req.body.content, date: req.body.date });
      from.conversations = [...newConvoArray, fromConvo];
    } else {
      from.conversations.push({
        convoId: other ? other : to.userId,
        sent: [{ content: req.body.content, date: req.body.date }],
        received: [],
      });
    }
  }
};

module.exports = mutateConvo;
