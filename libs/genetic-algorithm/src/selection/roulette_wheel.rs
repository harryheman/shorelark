use crate::*;

#[derive(Clone, Debug, Default)]
pub struct RouletteWheelSelection;

impl SelectionMethod for RouletteWheelSelection {
    fn select<'a, I>(&self, rng: &mut dyn RngCore, population: &'a [I]) -> &'a I
    where
        I: Individual,
    {
        population
            .choose_weighted(rng, |individual| individual.fitness().max(0.00001))
            .expect("получена пустая популяция")
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use rand::SeedableRng;
    use rand_chacha::ChaCha8Rng;
    use std::collections::BTreeMap;

    #[test]
    fn test() {
        let mut rng = ChaCha8Rng::from_seed(Default::default());

        let population = vec![
            TestIndividual::new(2.0),
            TestIndividual::new(1.0),
            TestIndividual::new(4.0),
            TestIndividual::new(3.0),
        ];

        let actual_histogram = (0..1000)
            .map(|_| RouletteWheelSelection.select(&mut rng, &population))
            .fold(BTreeMap::default(), |mut histogram, individual| {
                *histogram.entry(individual.fitness() as i32).or_default() += 1;
                histogram
            });

        let expected_histogram = maplit::btreemap! {
            // приспособленность => сколько раз эта приспособленность была выбрана
            1 => 98,
            2 => 202,
            3 => 278,
            4 => 422,
        };

        assert_eq!(actual_histogram, expected_histogram);
    }
}
