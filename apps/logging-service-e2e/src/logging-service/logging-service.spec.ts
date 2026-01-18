import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to logging-service!' });
  });

  it('should accept POST /logs', async () => {
    const res = await axios.post(`/logs`, {
      service: 'test-service',
      message: 'test log'
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Log received' });
  });
});
