const connection = () => {
    try {
        return new WebSocket('ws://192.168.1.73:9000/api/v1/join');
    } catch (error) {
        return null;
    }
}
export default connection;
