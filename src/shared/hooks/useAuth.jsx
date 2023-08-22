const useAuth = () => {
    return !!localStorage.getItem('auth')
}

export default useAuth