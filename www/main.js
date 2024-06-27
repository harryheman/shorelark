import * as sim from 'lib-simulation-wasm'
import { Terminal } from './src/terminal'
import { Viewport } from './src/viewport'

const terminal = new Terminal(
  document.getElementById('terminal-stdin'),
  document.getElementById('terminal-stdout'),
)
const viewport = new Viewport(document.getElementById('viewport'))

// Текущая симуляция
let simulation = new sim.Simulation(sim.Simulation.default_config())

// Индикатор активности симуляции
let active = true

const config = simulation.config()

terminal.println('  _____ _                    _            _    ')
terminal.println(' / ____| |                  | |          | |   ')
terminal.println('| (___ | |__   ___  _ __ ___| | __ _ _ __| | __')
terminal.println(" \\___ \\| '_ \\ / _ \\| '__/ _ \\ |/ _` | '__| |/ /")
terminal.println(' ____) | | | | (_) | | |  __/ | (_| | |  |   < ')
terminal.println('|_____/|_| |_|\\___/|_|  \\___|_|\\__,_|_|  |_|\\_\\')
terminal.println('')
terminal.println(
  'Симуляция эволюции с помощью нейронной сети, генетического алгоритма и высшей математики.',
)
terminal.println('')
terminal.println('https://habr.com/ru/companies/timeweb/articles/817585/')
terminal.println('')
terminal.println('--- Описание ---')
terminal.println('')
terminal.println(
  'Каждый треугольник представляет птицу; каждая птица обладает зрением, поле которого рисуется вокруг птицы, и мозг, который решает, куда и как быстро птица должна двигаться.',
)
terminal.println('')
terminal.println(
  'Каждый круг представляет еду, которую птицы должны искать и есть.',
)
terminal.println('')
terminal.println(
  'Птицы начинают с рандомизированными мозгами и после 2500 ходов (около 40 секунд) воспроизводятся те птицы, которые съели больше всего еды, и их потомство начинает новую симуляцию.',
)
terminal.println('')
terminal.println(
  'Благодаря генетическому алгоритму каждое поколение становится лучше в поиске еды - будто птицы сами себя программируют!',
)
terminal.println('')
terminal.println(
  '(обратите внимание, что птицы не жестко кодируются для обнаружения еды, а учатся этому со временем)',
)
terminal.println('')
terminal.println(
  'Вы можете влиять на симуляцию, вводя команды в поле внизу этого блока - для начала попробуйте выполнить команду `train` несколько раз (пишем `t`, нажимаем enter, пишем `t`, нажимаем enter и т.д.) - это ускоряет симуляцию, позволяя быстро увидеть, как птицы становятся умнее.',
)
terminal.println('')
terminal.println('Хотите узнать, как это работает?')
terminal.println('https://habr.com/ru/companies/timeweb/articles/817585/')
terminal.println('')
terminal.println('Интересует исходный код?')
terminal.println('https://github.com/harryheman/shorelark')
terminal.println('')
terminal.println('Веселитесь!')
terminal.println('')
terminal.println('--- Команды ---')
terminal.println('')
terminal.println('- p / pause')
terminal.println('  Приостанавливает (или возобновляет) симуляцию')
terminal.println('')
terminal.println(
  `- r / reset [animals=${config.world_animals}] [f=${config.world_foods}] [...]`,
)
terminal.println('  Запускает симуляцию с нуля с указанными опциональными')
terminal.println('  параметрами:')
terminal.println('')
terminal.println(`  * a / animals (default=${config.world_animals})`)
terminal.println('    количество животных')
terminal.println('')
terminal.println(`  * f / foods (default=${config.world_foods})`)
terminal.println('    количество еды')
terminal.println('')
terminal.println(`  * n / neurons (default=${config.brain_neurons})`)
terminal.println('    количество нейронов мозга для каждого животного')
terminal.println('')
terminal.println(`  * p / photoreceptors (default=${config.eye_cells})`)
terminal.println('    количество клеток глаза каждого животного')
terminal.println('')
terminal.println('  Примеры:')
terminal.println('    reset animals=100 foods=100')
terminal.println('    r a=100 f=100')
terminal.println('    r p=3')
terminal.println('')
terminal.println('- (t)rain [сколько-поколений]')
terminal.println('  Ускоряет одно или несколько поколений, позволяя')
terminal.println('  быстро увидеть результат обучения.')
terminal.println('')
terminal.println('  Примеры:')
terminal.println('    train')
terminal.println('    t 5')
terminal.println('')
terminal.println('--- Продвинутые возможности ---')
terminal.println('')
terminal.println('- `reset` может модифицировать *все* параметры:')
terminal.println('')
terminal.println('  * r i:integer_param=123 f:float_param=123')
terminal.println('  * r a=200 f=200 f:food_size=0.002')
terminal.println('')
terminal.println('  Это считается продвинутым, потому что вам нужно')
terminal.println('  смотреть исходный код для нахождения названий.')
terminal.println(
  '  (https://github.com/harryheman/shorelark/blob/main/libs/simulation/src/config.rs)',
)
terminal.println('')
terminal.println('--- Прикольные сценарии ---')
terminal.println('')
terminal.println('  * r i:ga_reverse=1 f:sim_speed_min=0.003')
terminal.println('    (птицы *избегают* еды)')
terminal.println('')
terminal.println('  * r i:brain_neurons=1')
terminal.println('    (зомби с одним нейроном)')
terminal.println('')
terminal.println('  * r f:food_size=0.05')
terminal.println('    (бооольшие птички)')
terminal.println('')
terminal.println('  * r f:eye_fov_angle=0.45')
terminal.println('    (узкое поле зрения)')
terminal.println('')
terminal.println('---')
terminal.scrollToTop()

terminal.onInput((input) => {
  terminal.println('')
  terminal.println(`$ ${input}`)

  try {
    exec(input)
  } catch (e) {
    terminal.println(`  ^ err: ${err}`)
  }
})

function exec(input) {
  if (input.includes('[') || input.includes(']')) {
    throw new Error(
      'Квадратные скобки нужны для документации. Вам не нужно их использовать, например: reset animals=100',
    )
  }

  const [cmd, ...args] = input.split(' ')

  switch (cmd) {
    case 'p':
    case 'pause':
      execPause(args)
      break
    case 'r':
    case 'reset':
      execReset(args)
      break
    case 't':
    case 'train':
      execTrain(args)
      break
    default:
      throw new Error(`Неизвестная команда: ${cmd}`)
  }
}

function execPause(args) {
  if (args.length > 0) {
    throw new Error('Данная команда не принимает параметры')
  }

  active = !active
}

function execReset(args) {
  const config = sim.Simulation.default_config()

  for (const arg of args) {
    const [key, value] = arg.split('=')

    if (key.startsWith('i:')) {
      config[key.slice(2)] = parseInt(value)
    } else if (key.startsWith('f:')) {
      config[key.slice(2)] = parseFloat(value)
    } else {
      switch (key) {
        case 'a':
        case 'animals':
          config.world_animals = parseInt(value)
          break
        case 'f':
        case 'foods':
          config.world_foods = parseInt(value)
          break
        case 'n':
        case 'neurons':
          config.brain_neurons = parseInt(value)
          break
        case 'p':
        case 'photoreceptors':
          config.eye_cells = parseInt(value)
          break
        default:
          throw new Error(`Неизвестный параметр: ${key}`)
      }
    }
  }

  simulation = new sim.Simulation(config)
}

function execTrain(args) {
  if (args.length > 1) {
    throw new Error('Данная команда принимает только один параметр')
  }

  const generations = args.length === 0 ? 1 : parseInt(args[0])

  for (let i = 0; i < generations; i += 1) {
    if (i > 0) {
      terminal.println('')
    }

    const stats = simulation.train()
    terminal.println(stats)
  }
}

function draw() {
  if (active) {
    const stats = simulation.step()

    if (stats) {
      terminal.println(stats)
    }
  }

  const config = simulation.config()
  const world = simulation.world()

  viewport.clear()

  for (const food of world.foods) {
    viewport.drawCircle(food.x, food.y, config.food_size / 2, 'rgb(0,255,128)')
  }

  for (const animal of world.animals) {
    viewport.drawTriangle(
      animal.x,
      animal.y,
      config.food_size,
      animal.rotation,
      'rgb(255,255,255)',
    )

    const anglePerCell = config.eye_fov_angle / config.eye_cells

    for (let i = 0; i < config.eye_cells; i += 1) {
      const startAngle =
        animal.rotation -
        config.eye_fov_angle / 2 +
        anglePerCell * i +
        Math.PI / 2
      const endAngle = startAngle + anglePerCell
      const energy = animal.vision[i]

      viewport.drawArc(
        animal.x,
        animal.y,
        config.food_size,
        startAngle,
        endAngle,
        `rgba(0,255,128,${energy})`,
      )
    }
  }

  requestAnimationFrame(draw)
}

draw()
