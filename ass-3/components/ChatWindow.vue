<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  currentUserId: { type: Number, required: true },
  otherUserId: { type: Number, required: true },
  otherUserName: { type: String, required: true },
});

const messages = ref([]);
const newMessage = ref('');
const interval = ref(null);
const router = useRouter();

const fetchMessages = async () => {
  try {
    const response = await fetch(`/api/messages?withUserId=${props.otherUserId}`, {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    const data = await response.json();
    messages.value = Array.isArray(data.messages) ? data.messages.filter(msg => msg && msg.content) : [];
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return; // Ignore empty messages
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensures cookies are sent
      body: JSON.stringify({ toUserId: props.otherUserId, content: newMessage.value }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    const data = await response.json();
    messages.value.push(data.message);
    newMessage.value = ''; // Clear input
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleTimeString();
  } catch {
    return 'Invalid Date';
  }
};

const goBackToFriends = () => {
  router.push('/friends');
};

onMounted(() => {
  fetchMessages();
  interval.value = setInterval(fetchMessages, 3000); // Poll for new messages every 3 seconds
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div class="chat-window">
    <div class="chat-header">{{ otherUserName }}</div>
    <div class="chat-messages">
      <div v-for="msg in messages" :key="msg.id" :class="{'my-message': msg.fromUserId === currentUserId, 'their-message': msg.fromUserId !== currentUserId}">
        <div>{{ msg.content }}</div>
        <div class="timestamp">{{ formatTimestamp(msg.timestamp) }}</div>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
    <button class="btn-back" @click="goBackToFriends">Go Back to Friends Page</button>
  </div>
</template>

<style scoped>
.chat-window {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 5px;
}

.my-message {
  text-align: right;
  background: #d1f5d3;
  padding: 8px;
  border-radius: 8px;
  margin: 5px;
}

.their-message {
  text-align: left;
  background: #e9e9e9;
  padding: 8px;
  border-radius: 8px;
  margin: 5px;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
}

.chat-input button {
  padding: 8px;
  background: #5bb9cd;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.chat-input button:hover {
  background: #4aa1b3;
}

.btn-back {
  margin-top: 10px;
  padding: 8px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-back:hover {
  background: #0056b3;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .chat-window {
    max-width: 90%;
    padding: 15px;
  }

  .chat-header {
    font-size: 18px;
  }

  .chat-input input,
  .chat-input button,
  .btn-back {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .chat-window {
    max-width: 100%;
    padding: 10px;
  }

  .chat-header {
    font-size: 16px;
  }

  .chat-input input,
  .chat-input button,
  .btn-back {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .chat-window {
    max-width: 100%;
    padding: 5px;
  }

  .chat-header {
    font-size: 14px;
  }

  .chat-input input,
  .chat-input button,
  .btn-back {
    padding: 6px;
  }
}

@media (max-width: 415px) {
  .chat-window {
    max-width: 100%;
    padding: 5px;
  }

  .chat-header {
    font-size: 14px;
  }

  .chat-input input,
  .chat-input button,
  .btn-back {
    padding: 5px;
  }
}
</style>