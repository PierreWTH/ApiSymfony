<?php

namespace App\Controller;

use App\HttpClient\BGAHttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', []);
    }

    #[Route('/games', name: 'app_games', methods: ['POST'])]
    public function displayGames(BGAHttpClient $bgg, Request $request) {
        $search = $request->request->get('searchValue');
        return new Response($bgg->getGames($search));
    }

    #[Route('/game', name: 'app_game', methods: ['POST'])]
    public function displayGame(BGAHttpClient $bgg, Request $request) {
        $search = $request->request->get('gameId');
        return new Response($bgg->getGame($search));
    }

}
