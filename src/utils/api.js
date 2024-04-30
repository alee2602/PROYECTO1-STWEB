

export const fetchWithAuth = async (url, method = 'GET', data = null) => {

    const token = localStorage.getItem('access_token');

    if (!token) {
        throw new Error('No token found');
    }

    // Crea un objeto de encabezados y añade los encabezados necesarios para la solicitud
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    headers.append('Authorization', `Bearer ${token}`); 

    // Configura el objeto para la solicitud fetch
    const config = {
        method, 
        headers, 
        body: data ? JSON.stringify(data) : undefined, 
    };

    // Realiza la solicitud fetch con la URL y la configuración proporcionada
    const response = await fetch(url, config);
    
    // Verifica si el estado de la respuesta es 401 o 403, indicativos de error de autenticación
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('access_token'); 
        throw new Error('Authentication failed, please login again'); 
    }


    if (method === 'DELETE' && !response.ok) {
        throw new Error('Failed to delete'); 
    } else if (!response.ok) {
        // Si la solicitud no fue exitosa y no es DELETE, obtiene el texto de error
        const errorText = await response.text();
        // Lanza un error con el texto obtenido o un mensaje predeterminado
        throw new Error(errorText || 'Something went wrong, no response text found');
    }

    // Antes de intentar parsear la respuesta como JSON, verifica que hay contenido
    if (response.headers.get("Content-Length") === "0" || !response.headers.get("Content-Type")?.includes("application/json")) {
        return {}; // Devuelve un objeto vacío si no hay contenido JSON
    }

    // Si hay contenido JSON, parsea y devuelve el JSON de la respuesta
    return await response.json(); 
};
