import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  
  console.log('Login attempt:', { email, password });

  const user = peopleData.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
           u.password === password
  );

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  setCookie(event, 'auth_token', user.id, { httpOnly: true });
  console.log('User authenticated:', user);

  return {
    user: {
      id: user.id,
      name: user.PersonName,
      email: user.email,
      age: user.age,
      avatar: user.Avatar,
      rating: user.Rating,
      commentary: user.Commentary,
      topic: user.Topic,
      favorites: [],
      posts: user.Posts,
    },
  };
});
