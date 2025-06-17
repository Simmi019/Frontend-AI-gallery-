import { useEffect } from "react"

export function useKeyboard(key, callback) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === key) {
        callback()
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [key, callback])
}
