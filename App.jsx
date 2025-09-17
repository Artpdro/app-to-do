import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const tasks = [
    'Estudar para concurso',
    'Estudar',
    'Projeto',
    'Algo saudável',
    'Ler'
  ]

  const [completedTasks, setCompletedTasks] = useState({})
  const [timeRemaining, setTimeRemaining] = useState('')

  // Função para obter a data atual no formato YYYY-MM-DD
  const getCurrentDate = () => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  }

  // Função para calcular o tempo restante até às 00:00
  const calculateTimeRemaining = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const diff = tomorrow - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const currentDate = getCurrentDate()
    const savedData = localStorage.getItem('dailyTasks')
    
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      
      // Se a data salva é diferente da atual, resetar as tarefas
      if (parsedData.date !== currentDate) {
        const resetData = {
          date: currentDate,
          completed: {}
        }
        localStorage.setItem('dailyTasks', JSON.stringify(resetData))
        setCompletedTasks({})
      } else {
        setCompletedTasks(parsedData.completed || {})
      }
    } else {
      // Primeira vez usando a aplicação
      const initialData = {
        date: currentDate,
        completed: {}
      }
      localStorage.setItem('dailyTasks', JSON.stringify(initialData))
    }
  }, [])

  // Atualizar cronômetro a cada segundo
  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining())
    }

    updateTimer() // Atualizar imediatamente
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  // Verificar se é um novo dia a cada minuto
  useEffect(() => {
    const checkNewDay = () => {
      const currentDate = getCurrentDate()
      const savedData = localStorage.getItem('dailyTasks')
      
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        
        if (parsedData.date !== currentDate) {
          // Novo dia - resetar tarefas
          const resetData = {
            date: currentDate,
            completed: {}
          }
          localStorage.setItem('dailyTasks', JSON.stringify(resetData))
          setCompletedTasks({})
        }
      }
    }

    const interval = setInterval(checkNewDay, 60000) // Verificar a cada minuto
    return () => clearInterval(interval)
  }, [])

  // Função para marcar tarefa como completa
  const handleTaskComplete = (taskIndex) => {
    if (completedTasks[taskIndex]) return // Não permitir desmarcar

    const newCompletedTasks = {
      ...completedTasks,
      [taskIndex]: true
    }

    setCompletedTasks(newCompletedTasks)

    // Salvar no localStorage
    const currentDate = getCurrentDate()
    const dataToSave = {
      date: currentDate,
      completed: newCompletedTasks
    }
    localStorage.setItem('dailyTasks', JSON.stringify(dataToSave))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        {/* Cronômetro */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {timeRemaining}
          </div>
          <div className="text-sm text-gray-500">
            Tempo restante para reset
          </div>
        </div>

        {/* Lista de Tarefas */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div 
                className={`w-8 h-8 border-2 border-gray-800 cursor-pointer flex items-center justify-center ${
                  completedTasks[index] ? 'bg-gray-800' : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => handleTaskComplete(index)}
              >
                {completedTasks[index] && (
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </div>
              <div className={`text-lg font-medium ${
                completedTasks[index] ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}>
                {task}
              </div>
            </div>
          ))}
        </div>

        {/* Progresso */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              Progresso do dia
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {Object.keys(completedTasks).length} / {tasks.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

